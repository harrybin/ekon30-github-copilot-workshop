import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'

const root = resolve(process.cwd())
const mode = process.argv[2]
if (!['init', 'reset'].includes(mode)) throw new Error('Usage: node scripts/demo-copy.mjs init|reset')

function git(args, capture = false) {
  const result = spawnSync('git', args, { cwd: root, encoding: 'utf8', stdio: capture ? 'pipe' : 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) throw new Error(`git ${args[0]} failed with exit code ${result.status}`)
  return capture ? result.stdout.trim() : undefined
}

const marker = join(root, '.workshop', 'demo-baseline.json')
if (mode === 'reset' && !existsSync(marker)) {
  throw new Error('No demo baseline found. Run the init task first and open the new checkout.')
}
const baseline = mode === 'reset'
  ? JSON.parse(readFileSync(marker, 'utf8')).commit
  : git(['rev-parse', '--verify', 'HEAD^{commit}'], true)
if (typeof baseline !== 'string' || !/^[0-9a-f]{40,64}$/.test(baseline)) {
  throw new Error('Invalid demo baseline commit.')
}
git(['cat-file', '-e', `${baseline}^{commit}`])

const destination = mkdtempSync(join(dirname(root), `${basename(root)}-demo-`))
console.log(`Creating a new demo checkout at: ${destination}`)
console.log(`Using committed baseline ${baseline}; uncommitted changes and progress are not copied.`)
try {
  git(['clone', '--no-hardlinks', '--no-checkout', '--', root, destination])
  git(['-C', destination, 'checkout', '--detach', baseline])
  mkdirSync(join(destination, '.workshop'), { recursive: true })
  writeFileSync(join(destination, '.workshop', 'demo-baseline.json'), JSON.stringify({ commit: baseline }) + '\n', { flag: 'wx' })
  console.log(`Open this folder in VS Code: ${destination}`)
} catch (error) {
  console.error(`The incomplete checkout was left at ${destination}; existing files were not removed.`)
  throw error
}
