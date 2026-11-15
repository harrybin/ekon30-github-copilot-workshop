# Demo Time: GitHub Copilot für Delphi

## Ziel und Rahmen

Vierstündiger Workshop für Delphi-Entwickler:innen: Completion, Chat, Agent,
Anpassungen und Toolrechte anhand des Session-Katalogs selbst ausprobieren,
Ergebnisse kritisch prüfen und persönliche Beobachtungen festhalten. Die
Übungen in `exercises/` sind die maßgebliche Quelle; dieses Skript ersetzt sie
nicht. 220 Minuten Übungen plus zwei Pausen ergeben 240 Minuten.

## Vorbereitung und sicherer Neustart

1. Einen **separaten Demo-Checkout** des Repositorys verwenden und als eigenen
   VS-Code-Ordner öffnen. Teilnehmende verwenden ihre eigenen Checkouts. Niemals
   den Checkout oder `.workshop/progress.json` einer anderen Person zurücksetzen.
2. Node.js, Lazarus/FPC, Git und VS Code mit angemeldetem Copilot vorbereiten;
   Demo Time für VS Code muss verfügbar sein. Die genauen Voraussetzungen und den
   Guide-Start beschreibt die `README.md`. Den Guide im Demo-Checkout starten
   und die vollständige ausgegebene URL öffnen. Persönliche Fortschrittsdaten
   dieses Checkouts bleiben lokal und sind keine automatischen Testnachweise.
3. Vor einer Wiederholung den bisherigen Demo-Checkout einschließlich
   `.workshop/progress.json` sichern oder aufbewahren. Einen **neuen separaten
   Checkout** von einer Version anlegen, die sowohl den unveränderten Starter
   als auch dieses `.demo`-Verzeichnis enthält, und dort Demo Time neu öffnen.
   Die Version vorher kontrollieren: Ein älterer Starter ohne `.demo` enthält
   den Act nicht.
   Keine automatische Wiederherstellung, kein Überschreiben und keine
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

| Szene | Zeit | Gemeinsam zeigen; danach selbstständig üben |
|---|---:|---|
| 0 Setup | 15 Min. | Tests und Anwendung starten; Lazarus-Projekt öffnen; Guide-Nachweis selbst speichern. Ohne funktionierenden Compiler die Einrichtung offen lassen und die Dateien lesend erkunden. |
| 1 Completions | 30 Min. | Signatur und Kommentar in `SessionCatalog.pas`; Inline-Vorschlag hinterfragen; zwei tatsächlich aufgerufene Tests ergänzen und ausführen. |
| 2 Chat | 35 Min. | Pascal-Unit und Tests als Kontext; erst erklären lassen, Aussagen am Code prüfen, genau einen Randfall ergänzen. Keine Unicode-Garantien erfinden. |
| Pause | 10 Min. | Pause nach Übung 2. |
| 3 Agent | 40 Min. | Eigenen Arbeitsstand sichern und Feature-Branch anlegen. Backlog lesen; zuerst Plan, erst nach ausdrücklicher Freigabe Änderungen. Eingabedaten, Diff und echte Tests prüfen. |
| 4 Instructions | 35 Min. | Vorher/Nachher vergleichen; drei Projektregeln und Review-Prompt **erst jetzt** erstellen. Prompt bewusst starten oder dessen Inhalt manuell als Kontext verwenden. |
| Pause | 10 Min. | Pause nach Übung 4. |
| 5 Skills | 25 Min. | Review-Skill erstellen; beobachtetes Laden von manuell beigefügtem Kontext unterscheiden. Custom Agent ist optional. |
| 6 Tools und MCP | 20 Min. | Lokalen Compileraufruf und Rechte getrennt von externen MCP-Fähigkeiten analysieren. Nur einen bereitgestellten lesenden Server optional zeigen; ansonsten Trockenübung. |
| 7 Capstone | 20 Min. | Exakten Track-Filter planen und nach Freigabe umsetzen; Test, Build, Diff-Review und Export. Bei Zeitmangel einen kleinen Fall abschließen und Rest offen notieren. |

Die Zeit umfasst Input und Übung, nicht zehn vollautomatische Szenen.
Teilnehmende dürfen eigene Lösungen entwickeln; Demo Time sendet weder Prompts
noch bestätigt es Toolrechte oder Checkpoints.

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
- **Zeit knapp:** Den jeweiligen Prüfschritt und offene Punkte sichtbar lassen;
  keine Tests, Bestätigungen oder MCP-Verbindungen erfinden.

Die Szenenreihenfolge, Dateiverweise und rein lesenden Aktionen lassen sich im
Workshop-Checkout prüfen:

```powershell
node --test .demo\workshop.test.mjs
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
