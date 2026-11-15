import { isComplete, stages } from './model.mjs'

const token = new URLSearchParams(location.search).get('token')
const main = document.querySelector('main')
const errorBox = document.querySelector('#error')
const status = document.querySelector('#save-status')
let workshop, progress, selected, stage = 'Verstehen', timer
let saving = Promise.resolve()
let saveFailed = false
let pendingSaves = 0
let navigating = false

function element(tag, text, className) {
  const node = document.createElement(tag)
  if (text !== undefined) node.textContent = text
  if (className) node.className = className
  return node
}

function showError(error) {
  errorBox.hidden = false
  errorBox.textContent = error.message
}

async function request(path, input) {
  const response = await fetch(path, {
    method: input ? 'POST' : 'GET',
    headers: { 'X-Workshop-Token': token ?? '', ...(input ? { 'Content-Type': 'application/json' } : {}) },
    ...(input ? { body: JSON.stringify(input) } : {}),
  })
  if (!response.ok) {
    const body = await response.json()
    throw new Error(body.error)
  }
  return response
}

function renderMarkdown(text) {
  const fragment = document.createDocumentFragment()
  let code, list
  for (const line of text.trim().split('\n')) {
    if (line.startsWith('```')) {
      if (code) code = undefined
      else {
        const pre = element('pre')
        code = element('code', '')
        pre.append(code)
        fragment.append(pre)
      }
      list = undefined
    } else if (code) code.textContent += `${line}\n`
    else if (/^\d+\. |^- /.test(line)) {
      const type = line.startsWith('- ') ? 'ul' : 'ol'
      if (list?.localName !== type) {
        list = element(type)
        if (type === 'ol') list.start = Number.parseInt(line, 10)
        fragment.append(list)
      }
      list.append(element('li', line.replace(/^\d+\. |^- /, '')))
    } else {
      list = undefined
      if (line.trim()) fragment.append(element('p', line))
    }
  }
  return fragment
}

function updatePath() {
  const nav = document.querySelector('#path')
  nav.replaceChildren()
  let complete = 0
  for (const [i, exercise] of workshop.exercises.entries()) {
    const done = isComplete(progress.exercises[exercise.id])
    if (done) complete++
    const button = element('button')
    button.append(element('span', done ? '✓' : String(i), 'step-number'), element('span', exercise.title))
    button.setAttribute('aria-label', `${i}. ${exercise.title}${done ? ', selbst bestätigt' : ', offen'}`)
    if (exercise.id === selected.id) button.setAttribute('aria-current', 'step')
    button.addEventListener('click', () => navigate(exercise, 'Verstehen'))
    nav.append(button)
  }
  document.querySelector('#progress').value = complete
  document.querySelector('#count').textContent = `${complete} von ${workshop.exercises.length} selbst bestätigt`
}

function scheduleSave() {
  status.textContent = 'Ungespeicherte Änderung …'
  clearTimeout(timer)
  timer = setTimeout(() => { persist().catch(showError) }, 450)
}

async function persist() {
  clearTimeout(timer)
  timer = undefined
  const exerciseId = selected.id
  const entry = structuredClone(progress.exercises[exerciseId])
  pendingSaves++
  const operation = saving.then(async () => {
    const response = await request('/api/progress', { revision: progress.revision, exerciseId, ...entry })
    const saved = await response.json()
    progress.revision = saved.revision
    saveFailed = false
    errorBox.hidden = true
    status.textContent = 'Lokal gespeichert · .workshop/progress.json'
  })
  saving = operation.catch((error) => {
    saveFailed = true
    status.textContent = 'Nicht gespeichert. Notizen kopieren und „Speichern erneut versuchen“ wählen.'
    showError(error)
  })
  try { await operation } finally { pendingSaves-- }
}

async function navigate(exercise, nextStage) {
  if (navigating) return
  navigating = true
  const controls = '#path button, main button, main input, main textarea, #export'
  document.querySelectorAll(controls).forEach((control) => { control.disabled = true })
  main.setAttribute('aria-busy', 'true')
  try {
    await persist()
    selected = exercise
    stage = nextStage
    location.hash = `${exercise.id}/${stage}`
    render()
    main.focus()
  } catch (error) { showError(error) }
  finally {
    navigating = false
    main.removeAttribute('aria-busy')
    document.querySelectorAll(controls).forEach((control) => { control.disabled = false })
  }
}

function render() {
  updatePath()
  main.replaceChildren()
  main.append(element('h1', selected.heading))
  main.append(element('p', `${selected.minutes} Minuten · ${selected.file}`, 'meta'))
  const tabs = element('nav', undefined, 'stages')
  tabs.setAttribute('aria-label', 'Arbeitsschritte')
  for (const name of stages) {
    const button = element('button', name)
    if (name === stage) button.setAttribute('aria-current', 'step')
    button.addEventListener('click', () => navigate(selected, name))
    tabs.append(button)
  }
  main.append(tabs)
  const content = element('section', undefined, 'content')
  content.append(element('h2', stage))
  main.append(content)
  if (stage !== 'Prüfen') content.append(renderMarkdown(selected.sections[stage]))
  if (stage === 'Umsetzen') {
    const heading = element('div', undefined, 'prompt-heading')
    heading.append(element('h2', 'Copilot-Startpunkt'))
    const copy = element('button', 'Prompt kopieren')
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(selected.prompt)
        status.textContent = 'Prompt kopiert. Vor dem Senden in Copilot prüfen.'
      } catch {
        showError(new Error('Zwischenablage nicht verfügbar. Prompt im Textblock markieren und manuell kopieren.'))
      }
    })
    heading.append(copy)
    const pre = element('pre')
    pre.append(element('code', selected.prompt))
    content.append(heading, pre, element('p', 'Keine automatische Ausführung. In Copilot einfügen und Auftrag prüfen.', 'meta'))
    const tip = element('details')
    tip.append(element('summary', 'Ich brauche einen Hinweis'), renderMarkdown(selected.sections.Tipp))
    content.append(tip)
  }
  if (stage === 'Prüfen') {
    const entry = progress.exercises[selected.id]
    content.append(element('p', 'Bestätige nur, was du selbst beobachtet hast. Ein grüner Haken startet keinen Compiler.'))
    for (const [i, check] of selected.checks.entries()) {
      const label = element('label', undefined, 'check')
      const input = element('input')
      input.type = 'checkbox'
      input.checked = entry.checks[i]
      input.addEventListener('change', () => {
        entry.checks[i] = input.checked
        updatePath()
        scheduleSave()
      })
      label.append(input, element('span', check))
      content.append(label)
    }
    const label = element('label', 'Mein Nachweis und offene Punkte', 'evidence-label')
    label.htmlFor = 'evidence'
    const notes = element('textarea')
    notes.id = 'evidence'
    notes.rows = 6
    notes.maxLength = 8000
    notes.value = entry.evidence
    notes.placeholder = 'Zum Beispiel: Testausgabe, eigene Beobachtung, korrigierte Annahme. Keine Zugangsdaten.'
    notes.addEventListener('input', () => {
      entry.evidence = notes.value
      updatePath()
      scheduleSave()
    })
    const retry = element('button', 'Speichern erneut versuchen')
    retry.addEventListener('click', () => persist().catch(showError))
    content.append(label, notes, retry)
  }
  const actions = element('div', undefined, 'next-actions')
  const index = stages.indexOf(stage)
  if (index < 2) {
    const next = element('button', `Weiter: ${stages[index + 1]}`, 'primary')
    next.addEventListener('click', () => navigate(selected, stages[index + 1]))
    actions.append(next)
  } else {
    const nextExercise = workshop.exercises[workshop.exercises.indexOf(selected) + 1]
    if (nextExercise) {
      const next = element('button', `Nächste Übung: ${nextExercise.title}`, 'primary')
      next.addEventListener('click', () => navigate(nextExercise, 'Verstehen'))
      actions.append(next)
    } else actions.append(element('p', 'Deine Notizen kannst du oben exportieren. Offene Schritte bleiben sichtbar.'))
  }
  main.append(actions)
}

document.querySelector('#export').addEventListener('click', async () => {
  try {
    await persist()
    const response = await request('/api/export')
    const url = URL.createObjectURL(await response.blob())
    const link = element('a')
    link.href = url
    link.download = 'copilot-delphi-workshop-notizen.md'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    status.textContent = 'Zusammenfassung exportiert.'
  } catch (error) { showError(error) }
})

window.addEventListener('beforeunload', (event) => {
  if (timer || pendingSaves || saveFailed) {
    event.preventDefault()
    event.returnValue = ''
  }
})

window.addEventListener('hashchange', () => {
  if (!workshop || navigating) return
  const [id, name] = decodeURIComponent(location.hash.slice(1)).split('/')
  const exercise = workshop.exercises.find((item) => item.id === id)
  if (exercise && stages.includes(name) && (selected.id !== id || stage !== name)) {
    navigate(exercise, name)
  }
})

try {
  ;[workshop, progress] = await Promise.all([
    request('/api/workshop').then((response) => response.json()),
    request('/api/progress').then((response) => response.json()),
  ])
  const [id, requestedStage] = decodeURIComponent(location.hash.slice(1)).split('/')
  selected = workshop.exercises.find((exercise) => exercise.id === id) ?? workshop.exercises[0]
  if (stages.includes(requestedStage)) stage = requestedStage
  render()
  document.querySelector('#export').disabled = false
} catch (error) {
  main.replaceChildren(element('h1', 'Guide konnte nicht geladen werden.'),
    element('p', 'Öffne die vollständige URL aus dem Terminal. Bei beschädigtem Fortschritt zuerst .workshop/progress.json sichern.'))
  showError(error)
}
