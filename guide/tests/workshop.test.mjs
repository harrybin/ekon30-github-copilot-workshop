import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { request as httpRequest } from 'node:http'
import { createProgressStore, loadWorkshop, startGuide } from '../server.mjs'
import { emptyProgress, exportSummary, isComplete, parseExercise } from '../model.mjs'

const workshop = await loadWorkshop()

async function temporary(t) {
  const directory = await mkdtemp(join(tmpdir(), 'copilot-delphi-test-'))
  t.after(() => rm(directory, { recursive: true, force: true }))
  return join(directory, 'progress.json')
}

test('eight Markdown exercises supply all stages, prompts, checks and schedule metadata', () => {
  assert.equal(workshop.exercises.length, 8)
  assert.equal(workshop.exercises.reduce((total, exercise) => total + exercise.minutes, 0), 220)
  assert.ok(workshop.exercises.every((exercise) => exercise.prompt.length > 40 && exercise.checks.length === 3))
  assert.throws(() => parseExercise('# Broken\n## Verstehen\nOnly text'), /all five/)
})

test('reading or checking boxes alone never completes an exercise', () => {
  const state = emptyProgress(workshop)
  const entry = state.exercises.setup
  assert.equal(isComplete(entry), false)
  entry.checks.fill(true)
  assert.equal(isComplete(entry), false)
  entry.evidence = '14 checks passed; I reviewed the output.'
  assert.equal(isComplete(entry), true)
  entry.checks[0] = false
  assert.equal(isComplete(entry), false)
})

test('progress persists across stores and includes Unicode notes', async (t) => {
  const path = await temporary(t)
  const store = createProgressStore(path, workshop)
  const state = await store.update({
    revision: 0, exerciseId: 'setup', checks: [true, false, false], evidence: 'Prüfung: ✓',
  })
  assert.equal(state.revision, 1)
  assert.deepEqual(await createProgressStore(path, workshop).read(), state)
})

test('conflicting writes and invalid checks are rejected without losing saved progress', async (t) => {
  const path = await temporary(t)
  const store = createProgressStore(path, workshop)
  const input = { revision: 0, exerciseId: 'setup', checks: [true, false, false], evidence: 'saved' }
  const results = await Promise.allSettled([store.update(input), store.update(input)])
  assert.equal(results.filter((result) => result.status === 'fulfilled').length, 1)
  assert.equal(results.find((result) => result.status === 'rejected').reason.status, 409)
  await assert.rejects(store.update({ ...input, revision: 1, checks: [true] }), /Invalid progress/)
  assert.equal((await store.read()).exercises.setup.evidence, 'saved')
  assert.equal((await store.read()).revision, 1)
})

test('corrupt and outdated files are never silently reset', async (t) => {
  const path = await temporary(t)
  const store = createProgressStore(path, workshop)
  await writeFile(path, '{broken')
  await assert.rejects(store.read(), SyntaxError)
  assert.equal(await readFile(path, 'utf8'), '{broken')
  await writeFile(path, JSON.stringify({ ...emptyProgress(workshop), contentVersion: 'old' }))
  await assert.rejects(store.read(), /outdated/)
})

test('export distinguishes self-confirmed and open exercises and quotes personal notes', () => {
  const state = emptyProgress(workshop)
  state.exercises.setup = { checks: [true, true, true], evidence: '14 checks passed\nStill need IDE setup.' }
  const markdown = exportSummary(workshop, state)
  assert.match(markdown, /Arbeitsplatz vorbereiten · selbst bestätigt/)
  assert.match(markdown, /Completions · offen/)
  assert.match(markdown, /> Still need IDE setup\./)
  assert.match(markdown, /kein automatisch geprüfter/)
})

async function runningGuide(t) {
  const guide = await startGuide({ port: 0, progressPath: await temporary(t) })
  t.after(() => new Promise((done) => guide.server.close(done)))
  return guide
}

test('loopback guide serves allowed assets with CSP, but never arbitrary repository files', async (t) => {
  const guide = await runningGuide(t)
  const response = await fetch(guide.url)
  assert.equal(response.status, 200)
  assert.match(response.headers.get('content-security-policy'), /script-src 'self'/)
  assert.match(await response.text(), /Copilot für Delphi/)
  for (const path of ['/README.md', '/src/SessionCatalog.pas', '/.git/config', '/..%2fREADME.md']) {
    assert.equal((await fetch(guide.origin + path)).status, 404)
  }
})

test('API requires its token, exact host and matching origin', async (t) => {
  const guide = await runningGuide(t)
  assert.equal((await fetch(`${guide.origin}/api/progress`)).status, 403)
  const headers = { 'X-Workshop-Token': guide.token }
  assert.equal((await fetch(`${guide.origin}/api/progress`, { headers })).status, 200)
  assert.equal((await fetch(`${guide.origin}/api/progress`, {
    headers: { ...headers, Origin: 'https://example.com' },
  })).status, 403)
  const invalidHostStatus = await new Promise((done, reject) => {
    const request = httpRequest(`${guide.origin}/api/progress`, {
      headers: { ...headers, Host: 'attacker.invalid' },
    }, (response) => {
      response.resume()
      done(response.statusCode)
    })
    request.on('error', reject)
    request.end()
  })
  assert.equal(invalidHostStatus, 403)
})

test('HTTP progress updates survive reopening; malformed and oversized requests fail', async (t) => {
  const guide = await runningGuide(t)
  const headers = { 'X-Workshop-Token': guide.token, 'Content-Type': 'application/json' }
  const body = JSON.stringify({ revision: 0, exerciseId: 'setup', checks: [true, true, true], evidence: 'Läuft: ✓' })
  const result = await fetch(`${guide.origin}/api/progress`, { method: 'POST', headers, body })
  assert.equal(result.status, 200)
  const state = await (await fetch(`${guide.origin}/api/progress`, { headers })).json()
  assert.equal(state.exercises.setup.evidence, 'Läuft: ✓')
  const exported = await (await fetch(`${guide.origin}/api/export`, { headers })).text()
  assert.match(exported, /Läuft: ✓/)
  assert.equal((await fetch(`${guide.origin}/api/progress`, {
    method: 'POST', headers, body: '{broken',
  })).status, 400)
  assert.equal((await fetch(`${guide.origin}/api/progress`, {
    method: 'POST', headers, body: 'x'.repeat(41000),
  })).status, 413)
})
