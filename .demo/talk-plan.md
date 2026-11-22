# Demo Time: GitHub Copilot für Delphi

## Ziel und Rahmen

Workshop für Delphi-Entwickler:innen: Completion, Chat, Agent,
Anpassungen und Toolrechte anhand des Session-Katalogs selbst ausprobieren,
Ergebnisse kritisch prüfen und persönliche Beobachtungen festhalten. Die
Übungen in `exercises/` sind die maßgebliche Quelle; dieses Skript ersetzt sie
nicht.

## Vorbereitung und sicherer Neustart

1. Über **Terminal → Run Task → Workshop: Demo-Checkout initialisieren** einen
   **separaten Demo-Checkout** erzeugen und den ausgegebenen Ordner als eigenen
   VS-Code-Ordner öffnen. Teilnehmende verwenden ihre eigenen Checkouts. Niemals
   den Checkout oder `.workshop/progress.json` einer anderen Person zurücksetzen.
2. **Windows ist der Standard:** Node.js, Lazarus/FPC, Git und VS Code mit
   angemeldetem Copilot vorbereiten; Demo Time für VS Code muss verfügbar sein.
   Auf macOS gelten dieselben Voraussetzungen mit den offiziellen
   Lazarus-/FPC-Paketen. Die genauen Voraussetzungen und Startbefehle beschreibt
   die `README.md`. Den Guide im Demo-Checkout starten und die vollständige
   ausgegebene URL öffnen. Persönliche Fortschrittsdaten dieses Checkouts
   bleiben lokal und sind keine automatischen Testnachweise.
3. Vor einer Wiederholung den bisherigen Demo-Checkout einschließlich
   `.workshop/progress.json` aufbewahren. In diesem Checkout den Task
   **Workshop: Demo neu beginnen** ausführen und den ausgegebenen neuen
   Checkout öffnen. Er verwendet den beim Initialisieren gemerkten Commit.
   Die Version vorher kontrollieren: Ein älterer Starter ohne `.demo` enthält
   den Act nicht.
   Kein Überschreiben und keine
   Löschbefehle: Die Szenen öffnen nur vorhandene Dateien bzw. zeigen eine
   Pausenmeldung. In Übung 3 einen neuen, noch nicht existierenden
   Feature-Branch wählen, falls der vorgeschlagene Name schon vergeben ist.
4. Im Demo-Time-Bereich den Act `01-delphi-workshop` auswählen. Die Szenen
   einzeln und in Reihenfolge starten; sie laufen **nicht** zeitgesteuert weiter.
   Die Datei jeder Übung wird zuletzt im Editor geöffnet. VS Code kann zuvor
   geöffnete Dateien im Vorschau-Tab ersetzen; bei Bedarf die Pascal-Dateien
   über den Explorer erneut öffnen oder deren Tabs anheften. Die eigentlichen
   Prompts, Änderungen, Toolfreigaben, Tests und Checkpoints erfolgen bewusst
   manuell. Presenter Notes verweisen auf dieses Dokument.

## Ablauf und Moderationshinweise

| Szene | Gemeinsam zeigen; danach selbstständig üben |
|---|---|
| 0 Setup | Tests und Anwendung starten; Lazarus-Projekt öffnen; Guide-Nachweis selbst speichern. Ohne funktionierenden Compiler die Einrichtung offen lassen und die Dateien lesend erkunden. |
| 1 Completions | Signatur und Kommentar in `SessionCatalog.pas`; Inline-Vorschlag hinterfragen; zwei tatsächlich aufgerufene Tests ergänzen und ausführen. |
| 2 Chat | Pascal-Unit und Tests als Kontext; erst erklären lassen, Aussagen am Code prüfen, genau einen Randfall ergänzen. Keine Unicode-Garantien erfinden. |
| Pause | Pause nach Übung 2. |
| 3 Agent | Eigenen Arbeitsstand sichern und Feature-Branch anlegen. Backlog lesen; zuerst Plan, erst nach ausdrücklicher Freigabe Änderungen. Eingabedaten, Diff und echte Tests prüfen. |
| 4 Instructions | Vorher/Nachher vergleichen; eine zusätzliche Projektregel und das Review-Prompt erstellen. Prompt bewusst starten oder dessen Inhalt manuell als Kontext verwenden. |
| Pause | Pause nach Übung 4. |
| 5 Skills | Review-Skill erstellen; beobachtetes Laden von manuell beigefügtem Kontext unterscheiden. Custom Agent ist optional. |
| 6 Tools und MCP | Lokalen Compileraufruf und Rechte getrennt von externen MCP-Fähigkeiten analysieren. Nur einen bereitgestellten lesenden Server optional zeigen; ansonsten Trockenübung. |
| 7 Capstone | An die Track-Logik aus Übung 3 anknüpfen; exakten Track-Filter planen und nach Freigabe umsetzen; Test, Build, Diff-Review und Export. Bei offenem Arbeitsschritt die offenen Punkte notieren. |

Der Ablauf umfasst Input und Übung, nicht zehn vollautomatische Szenen.
Teilnehmende dürfen eigene Lösungen entwickeln; Demo Time sendet weder Prompts
noch bestätigt es Toolrechte oder Checkpoints.

## Optionale Presenter-Live-Demo

Für einen sichtbaren Copilot-Auftrag gibt es den separaten Act
`02-presenter-capstone`. Er ergänzt den Teilnehmerablauf nicht und öffnet nur
Dateien. Die Anleitung in `.demo/presenter-capstone.md` verlangt einen frischen,
separaten Presenter-Checkout, startet den vorhandenen Capstone-Prompt manuell
in Copilot Agent und lässt Plan, echten Diff sowie echte Pascal-Testausgabe
prüfen. Bei fehlendem Copilot oder Compiler zeigt der Fallback die Einschränkung
offen; es gibt keine vorbereiteten Antworten oder fingierten Testerfolge.

## Fallback und Nachweise

- **Copilot langsam oder nicht verfügbar:** Prompt und Akzeptanzkriterien aus
  der jeweiligen Übung lesen, Kontext und mögliche Lösung gemeinsam besprechen
  oder von Hand arbeiten. Bei Completions den Code selbst ergänzen und den
  fehlenden Inline-Vorschlag notieren; beim Chat die Erklärung am Code selbst
  herleiten. Agent- und Capstone-Auftrag zunächst als Plan besprechen, dann
  gegebenenfalls manuell umsetzen. Bei Skills und Prompt Files deren Inhalt
  manuell als Kontext verwenden. Ausstehende Agent-Freigabe, nicht beobachtete
  Skill-Aktivierung und nicht verfügbare Vorschläge ausdrücklich offen lassen;
  nicht als Live-Erfolg ausgeben.
- **Compiler fehlt oder Test schlägt fehl:** Ausgabe und Ursache festhalten,
  nicht nur den erfolgreichen Build behaupten. Ohne Lazarus ist der
  Setup-Checkpoint nicht erfüllt; `test:fpc` ersetzt ihn nicht.
- **Guide oder Canvas nicht verfügbar:** Übungen direkt aus `exercises/`
  lesen und persönliche Notizen außerhalb des Checkouts sichern. Eine spätere
  Übertragung in den Guide ist manuell; keine fremden Fortschrittsdateien
  überschreiben.
- **Demo Time fehlt:** Dieselbe Reihenfolge anhand der Tabelle und der
  Übungsdateien manuell durchführen. Das ist kein Nachweis einer Demo-Time-
  Ausführung.
- **Übung nicht abgeschlossen:** Den jeweiligen Prüfschritt und offene Punkte sichtbar lassen;
  keine Tests, Bestätigungen oder MCP-Verbindungen erfinden.

Die Szenenreihenfolge, Dateiverweise und rein lesenden Aktionen lassen sich im
Workshop-Checkout prüfen:

```powershell
node --test .demo\workshop.test.mjs
```

Unter macOS im Terminal:

```sh
node --test .demo/workshop.test.mjs
```

Dieser Test ersetzt weder eine Schema-Prüfung noch einen echten Probelauf in
VS Code mit Demo Time.

## Quellen und Abgrenzung

Struktur und Aktionen folgen dem offiziellen
[Demo-Time-Skill für Code-Demos](https://github.com/estruyf/vscode-demo-time/blob/main/skills/demotime-code-demo/SKILL.md),
dem [Workshop-Planungsskill](https://github.com/estruyf/vscode-demo-time/blob/main/skills/demotime-talk-plan/SKILL.md)
und dem [Demo-Time-Schema](https://demotime.show/demo-time.schema.json).
Der optionale Copilot-App-Canvas des parallelen Umbaus und der Browser-Guide
verwenden dieselben Übungen; dieses VS-Code-Skript ändert deren Fortschritt
nicht und setzt keine Canvas-Aktionen voraus.
