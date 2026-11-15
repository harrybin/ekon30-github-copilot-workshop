export const stages = ['Verstehen', 'Umsetzen', 'Prüfen']
const sections = ['Verstehen', 'Umsetzen', 'Prompt', 'Prüfen', 'Tipp']

export function parseExercise(markdown) {
  const result = { heading: '', sections: {} }
  let current
  for (const line of markdown.split(/\r?\n/)) {
    if (line.startsWith('# ')) result.heading = line.slice(2)
    else if (line.startsWith('## ')) {
      current = line.slice(3)
      if (!sections.includes(current) || current in result.sections) {
        throw new Error(`Unknown or duplicate exercise section: ${current}`)
      }
      result.sections[current] = ''
    } else if (current) result.sections[current] += `${line}\n`
  }
  if (!result.heading || sections.some((key) => !result.sections[key]?.trim())) {
    throw new Error('Exercise requires a title and all five workshop sections.')
  }
  result.checks = result.sections['Prüfen'].split('\n')
    .filter((line) => line.startsWith('- ')).map((line) => line.slice(2))
  const prompt = result.sections.Prompt.match(/^```text\n([\s\S]*?)\n```/m)
  if (!result.checks.length || !prompt) throw new Error('Exercise requires checks and a text prompt.')
  result.prompt = prompt[1]
  return result
}

export function emptyProgress(workshop) {
  return {
    version: 1,
    contentVersion: workshop.contentVersion,
    revision: 0,
    exercises: Object.fromEntries(workshop.exercises.map((exercise) => [
      exercise.id, { checks: exercise.checks.map(() => false), evidence: '' },
    ])),
  }
}

export function validateProgress(state, workshop) {
  if (!state || state.version !== 1 || state.contentVersion !== workshop.contentVersion
    || !Number.isSafeInteger(state.revision) || state.revision < 0
    || !state.exercises || Array.isArray(state.exercises)
    || Object.keys(state.exercises).length !== workshop.exercises.length) {
    throw new Error('Invalid or outdated progress. Back up .workshop/progress.json before starting a new attempt.')
  }
  for (const exercise of workshop.exercises) {
    const entry = state.exercises[exercise.id]
    if (!entry || !Array.isArray(entry.checks) || entry.checks.length !== exercise.checks.length
      || entry.checks.some((value) => typeof value !== 'boolean')
      || typeof entry.evidence !== 'string' || entry.evidence.length > 8000) {
      throw new Error(`Invalid progress for ${exercise.id}. Restore a valid progress backup.`)
    }
  }
  return state
}

export function isComplete(entry) {
  return entry.checks.length > 0 && entry.checks.every(Boolean) && Boolean(entry.evidence.trim())
}

export function exportSummary(workshop, state) {
  return [
    `# ${workshop.title} — meine Workshop-Notizen`,
    '',
    'Persönliche Selbstauskunft, kein automatisch geprüfter Build- oder Qualitätsnachweis.',
    ...workshop.exercises.flatMap((exercise) => {
      const entry = state.exercises[exercise.id]
      return [
        '', `## ${exercise.title} · ${isComplete(entry) ? 'selbst bestätigt' : 'offen'}`, '',
        ...exercise.checks.map((check, i) => `- [${entry.checks[i] ? 'x' : ' '}] ${check}`),
        '', 'Nachweis / Beobachtung / offene Punkte:', '',
        // Quote participant text so it remains visibly separate from authored guidance.
        ...((entry.evidence || 'Noch kein Nachweis.').split('\n').map((line) => `> ${line}`)),
      ]
    }),
    '',
  ].join('\n')
}
