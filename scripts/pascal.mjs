import { spawnSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url))
const command = process.argv[2]
if (!['build', 'test', 'run'].includes(command)) {
  throw new Error('Usage: node scripts/pascal.mjs build|test|run [--fpc]')
}
const testing = command === 'test'
const name = testing ? 'CatalogTests' : 'CatalogDemo'
const project = testing ? `tests/${name}` : name
const directFpc = process.argv.includes('--fpc')
mkdirSync(resolve(root, 'bin'), { recursive: true })
mkdirSync(resolve(root, 'lib/direct'), { recursive: true })

function run(executable, args) {
  const result = spawnSync(executable, args, { cwd: root, stdio: 'inherit' })
  if (result.error) {
    console.error(`Cannot start ${executable}: ${result.error.message}`)
    console.error('Install Lazarus with Free Pascal and add lazbuild/fpc to PATH. See README.md.')
    process.exit(1)
  }
  if (result.status !== 0) process.exit(result.status ?? 1)
}

run(directFpc ? 'fpc' : 'lazbuild', directFpc
  ? ['-B', '-Mdelphi', '-Sh', '-Cr', '-Co', '-Fusrc', '-FUlib/direct', '-FEbin', `${project}.lpr`]
  : ['--build-all', `${project}.lpi`])
if (command !== 'build') {
  run(resolve(root, 'bin', name + (process.platform === 'win32' ? '.exe' : '')), [])
}
