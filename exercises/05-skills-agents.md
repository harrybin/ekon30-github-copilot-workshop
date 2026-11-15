# 5. Skills und Custom Agents

## Verstehen

Ein Skill bündelt Workflow-Wissen, ein Custom Agent eine spezialisierte Rolle. Nicht jede Wiederholung braucht einen Agenten. Wir erstellen eine kleine Pascal-Review-Hilfe statt eines ganzen Agententeams.

## Umsetzen

1. .github/skills/catalog-test-review/SKILL.md mit name und description im YAML-Frontmatter anlegen.
2. Trigger und Ablauf beschreiben: Kriterien lesen, Pascal-Diff prüfen, Tests ausführen, offene Fälle nennen.
3. Einen passenden Auftrag starten und beobachten, ob der Skill geladen wird; andernfalls den Inhalt gezielt als Kontext beifügen.
4. Optional .github/agents/pascal-reviewer.agent.md mit description und einer reinen Reviewer-Rolle erstellen. Nur tatsächlich verfügbare lesende Tools auswählen.
5. Einen Befund mit Dateireferenz und überprüfbarem Verhalten dokumentieren.

## Prompt

```text
Entwirf den Skill catalog-test-review für kleine Pascal-Änderungen.
Er soll Delphi/FPC-Kompatibilität, dynamische Arrays, Randfälle
und echte Testausführung prüfen. Keine Dateien ungefragt korrigieren.
Grenze ihn von einer reinen Reviewer-Agent-Rolle ab.
Verwende nur Fähigkeiten, die diese Copilot-Oberfläche unterstützt.
```

## Prüfen

- SKILL.md hat einen konkreten Trigger und nachvollziehbare Prüfschritte.
- Ich kann Wissen/Workflow von Rolle und Toolrechten unterscheiden.
- Mein Nachweis benennt einen beobachteten Aufruf oder klar den manuellen Kontextweg.

## Tipp

Ein Skill darf den Ablauf beschreiben, aber keine erfolgreiche Testausführung erfinden. Auch ein Reviewer ohne Schreibrechte muss sagen, welche Aussagen nur statisch geprüft wurden.
