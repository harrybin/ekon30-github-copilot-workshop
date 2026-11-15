import { createServer } from 'node:http'
import { readFile, mkdir, rename, writeFile } from 'node:fs/promises'
import { createHash, randomBytes } from 'node:crypto'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { emptyProgress, exportSummary, parseExercise, validateProgress } from './model.mjs'

const root = fileURLToPath(new URL('../', import.meta.url))
const assets = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/app.mjs', ['app.mjs', 'text/javascript; charset=utf-8']],
  ['/model.mjs', ['model.mjs', 'text/javascript; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
])

export async function loadWorkshop() {
  const manifest = JSON.parse(await readFile(new URL('./workshop.json', import.meta.url), 'utf8'))
  const ids = new Set()
  const exercises = await Promise.all(manifest.exercises.map(async (exercise) => {
    if (!/^[a-z-]+$/.test(exercise.id) || ids.has(exercise.id)
      || !/^\d\d-[a-z-]+\.md$/.test(exercise.file)
      || !Number.isInteger(exercise.minutes) || exercise.minutes < 1) {
      throw new Error('Invalid workshop manifest.')
    }
    ids.add(exercise.id)
    const markdown = await readFile(resolve(root, 'exercises', exercise.file), 'utf8')
    return { ...exercise, ...parseExercise(markdown) }
  }))
  const contentVersion = createHash('sha256').update(JSON.stringify(exercises)).digest('hex')
  return { title: manifest.title, exercises, contentVersion }
}

function failure(message, status = 400) {
  return Object.assign(new Error(message), { status })
}

export function createProgressStore(path, workshop) {
  let queue = Promise.resolve()
  async function read() {
    let text
    try {
      text = await readFile(path, 'utf8')
    } catch (error) {
      if (error.code === 'ENOENT') return emptyProgress(workshop)
      throw error
    }
    return validateProgress(JSON.parse(text), workshop)
  }
  return {
    read,
    update(input) {
      const operation = queue.then(async () => {
        const state = await read()
        if (input.revision !== state.revision) {
          throw failure('Progress changed in another panel. Copy your notes, reload, then retry.', 409)
        }
        if (!Object.hasOwn(state.exercises, input.exerciseId)) throw failure('Unknown exercise.')
        state.exercises[input.exerciseId] = { checks: input.checks, evidence: input.evidence }
        state.revision++
        validateProgress(state, workshop)
        await mkdir(dirname(path), { recursive: true })
        const temporary = `${path}.${randomBytes(8).toString('hex')}.tmp`
        await writeFile(temporary, JSON.stringify(state, null, 2) + '\n', { mode: 0o600 })
        await rename(temporary, path)
        return state
      })
      queue = operation.catch(() => {})
      return operation
    },
  }
}

export async function startGuide({ port = 4317, progressPath = resolve(root, '.workshop/progress.json') } = {}) {
  const workshop = await loadWorkshop()
  const store = createProgressStore(progressPath, workshop)
  await store.read()
  const token = randomBytes(24).toString('hex')
  let origin
  const server = createServer(async (req, res) => {
    res.setHeader('Cache-Control', 'no-store')
    res.setHeader('Referrer-Policy', 'no-referrer')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('Content-Security-Policy', "default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self'; base-uri 'none'; form-action 'none'")
    const json = (value, status = 200) => {
      res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' })
      res.end(JSON.stringify(value))
    }
    try {
      if (req.headers.host !== new URL(origin).host) throw failure('Invalid Host.', 403)
      const url = new URL(req.url, origin)
      if (assets.has(url.pathname) && req.method === 'GET') {
        const [file, type] = assets.get(url.pathname)
        res.writeHead(200, { 'Content-Type': type })
        res.end(await readFile(new URL(file, import.meta.url)))
        return
      }
      if (!url.pathname.startsWith('/api/')) throw failure('Not found.', 404)
      if (req.headers['x-workshop-token'] !== token
        || (req.headers.origin && req.headers.origin !== origin)) {
        throw failure('Open the complete URL printed by npm run guide. Access denied.', 403)
      }
      if (req.method === 'GET' && url.pathname === '/api/workshop') return json(workshop)
      if (req.method === 'GET' && url.pathname === '/api/progress') return json(await store.read())
      if (req.method === 'GET' && url.pathname === '/api/export') {
        res.writeHead(200, { 'Content-Type': 'text/markdown; charset=utf-8' })
        res.end(exportSummary(workshop, await store.read()))
        return
      }
      if (req.method === 'POST' && url.pathname === '/api/progress') {
        if (req.headers['content-type'] !== 'application/json') throw failure('JSON required.', 415)
        const chunks = []
        let size = 0
        for await (const chunk of req) {
          size += chunk.length
          if (size > 40000) throw failure('Notes are too large.', 413)
          chunks.push(chunk)
        }
        let input
        try { input = JSON.parse(Buffer.concat(chunks).toString('utf8')) } catch { throw failure('Invalid JSON.') }
        if (!input || typeof input !== 'object') throw failure('Invalid progress input.')
        return json(await store.update(input))
      }
      throw failure('Not found.', 404)
    } catch (error) {
      json({ error: error.message }, error.status ?? 500)
    }
  })
  await new Promise((done, reject) => {
    server.once('error', reject)
    server.listen(port, '127.0.0.1', done)
  })
  origin = `http://127.0.0.1:${server.address().port}`
  return { server, origin, token, url: `${origin}/?token=${token}`, workshop }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const { server, url } = await startGuide()
    console.log(`\nWorkshop-Guide: ${url}\n`)
    console.log('VS Code: Simple Browser: Show → vollständige URL einfügen.')
    console.log('Lokaler Guide, keine native Copilot-Canvas-Erweiterung. Stoppen: Strg+C.')
    for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close())
  } catch (error) {
    console.error(`Guide konnte nicht starten: ${error.message}`)
    process.exitCode = 1
  }
}
