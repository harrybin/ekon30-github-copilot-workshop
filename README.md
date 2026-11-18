# GitHub Copilot von A bis Z — für Delphi-Entwickler:innen

Mit Harald Binkle und Thomas Tomow erweitern wir einen kleinen Session-Katalog in **Delphi-kompatiblem Object Pascal**. Gebaut wird mit **Lazarus / Free Pascal**, ohne RAD-Studio-Lizenz. Alle Sessiondaten im Starter sind erfunden.

Die interaktive Workshop-Führung übernimmt das Lernprinzip von [Copilot Governance at Scale](https://github.com/octodemo/copilot-governance-at-scale): verstehen, umsetzen, prüfen und persönliche Beobachtungen festhalten. Die Implementierung und Inhalte hier sind eigenständig.

## Voraussetzungen

- **Windows (empfohlen):** Lazarus 3+ mit Free Pascal 3.2.2+, Git, Node.js 24+ und VS Code installieren. `lazbuild` und `fpc` müssen in `PATH` verfügbar sein.
- Für den VS-Code-Demolauf zusätzlich die Erweiterung `eliostruyf.vscode-demo-time` über die Extensions-Ansicht installieren; Canvas und Browser-Fallback benötigen sie nicht.
- VS Code mit angemeldetem GitHub Copilot; alternativ für Chat-/Agent-Übungen die GitHub Copilot App mit einem **lokalen** Checkout.
- Code Completion üben wir in VS Code. Die Copilot App ersetzt dafür keinen Editor.

Nach der Lazarus-Installation in PowerShell mit `Get-Command lazbuild,fpc`, `lazbuild --version` und `fpc -iV` prüfen. Falls sie nicht gefunden werden, den Lazarus-Ordner mit `lazbuild.exe` sowie den FPC-Ordner mit `fpc.exe` zum **Benutzer-PATH** hinzufügen und VS Code neu starten. Die tatsächlichen Ordner hängen von Installation und Architektur ab.

**macOS:** Die offiziellen Lazarus-/FPC-Pakete sowie Git, Node.js 24+ und VS Code installieren. Im Terminal sicherstellen, dass `lazbuild` und `fpc` im `PATH` liegen. Die folgenden npm- und Build-Befehle sind dieselben wie unter Windows.

## Start

Der Workshop-Starter liegt im öffentlichen Repository `harrybin/ekon30-github-copilot-workshop`.

Unter Windows in **PowerShell**:

```powershell
git clone https://github.com/harrybin/ekon30-github-copilot-workshop.git
Set-Location .\ekon30-github-copilot-workshop
npm test
npm start
npm run guide
```

Unter macOS im **Terminal**:

```sh
git clone https://github.com/harrybin/ekon30-github-copilot-workshop.git
cd ekon30-github-copilot-workshop
npm test
npm start
npm run guide
```

`npm test` baut das Testprojekt mit `lazbuild` und führt zunächst **14 Verhaltenschecks** aus. `npm start` baut und startet die Pascal-Konsolenanwendung. `npm run guide` startet einen lokalen Server und gibt eine vollständige URL inklusive Zugriffstoken aus. **Diese vollständige URL öffnen**, nicht nur die Portnummer.

## Lizenz

Die MIT-Lizenz in [`LICENSE`](LICENSE) gilt für Harald Binkles eigene Workshoptexte, den Demo-Code und die Copilot-Canvas-Extension. Abhängigkeiten und ausdrücklich gekennzeichnete Drittinhalte behalten ihre jeweiligen Lizenzen.

## Geführte Durchführung in Copilot Canvas

Das Repository enthält eine projektbezogene Canvas-Extension unter `.github/extensions/copilot-delphi-workshop/`. In der GitHub Copilot App das Repository als Projekt öffnen und den **Copilot-Workshop · Delphi**-Canvas verwenden. Die Oberfläche führt durch dieselben Markdown-Übungen unter `exercises/`; sie dupliziert weder Aufgaben noch Checklisten. Optional kann der Canvas mit einer `exerciseId` bei einer bestimmten Übung geöffnet werden.

Die Extension verwendet die bestehende, loopback-gebundene Guide-Oberfläche als Canvas-Renderer. Persönliche Checklisten und Nachweise bleiben im Checkout unter `.workshop/progress.json` erhalten, auch wenn Canvas oder Extension neu geladen werden. Die lesende Canvas-Aktion `get_workshop_status` teilt nur Übungsstatus und Zähler mit Copilot, nicht die persönlichen Notizen. Fortschritt ist pro Checkout lokal; er wird nicht synchronisiert.

**VS Code und Browser-Fallback:** VS Code kann den gleichen lokalen Guide weiter verwenden. `npm run guide` startet den Browser-Fallback und druckt die vollständige URL mit Zugriffstoken; diese URL im Simple Browser oder einem normalen Browser öffnen. In Remote-Sessions ist der Loopback-Server nur aus der jeweiligen Session erreichbar, nicht automatisch vom lokalen Rechner. **Tasks: Run Test Task** führt die Pascal-Tests aus.

Canvas und Browser-Fallback bieten:

- Acht Übungen mit den Schritten **Verstehen → Umsetzen → Prüfen**.
- Kopierbare Copilot-Prompts und aufklappbare Hinweise.
- Persönliche Checklisten, Notizen und Markdown-Export.
- Lokale Speicherung in `.workshop/progress.json`, unabhängig vom Browserfenster. Zum gleichen Checkout zurückkehren, um weiterzuarbeiten.

Ein Checkpoint gilt nur dann als **selbst bestätigt**, wenn alle Kriterien angehakt sind und ein eigener Nachweis eingetragen ist. Das ist keine automatische Build-Prüfung. Bei Speicherfehlern bleiben Eingaben sichtbar; erst nach erfolgreichem Speichern weiterwechseln. Bei Konflikten mit einem zweiten Fenster Notizen kopieren, neu laden und erneut eintragen.

## Workshop-Pfad

| Abschnitt | Ergebnis |
|---|---|
| 0 · Setup | Lazarus-Build, Tests, Guide |
| 1 · Completions | Pascal-Funktion und neue Checks |
| 2 · Chat mit Kontext | Verstandenes Verhalten, zusätzlicher Randfall |
| Pause | |
| 3 · Agent Mode | Track-Zählung mit Tests und Review |
| 4 · Instructions & Prompts | Projektregeln und Review-Prompt |
| Pause | |
| 5 · Skills & Custom Agents | Wiederholbarer Review-Ablauf |
| 6 · Tools & MCP | Berechtigungsanalyse; Live-MCP optional |
| 7 · Capstone | Eigenes Feature und exportierte Notizen |

Für einen echten, sichtbaren Copilot-Agent-Auftrag mit Review und möglichem
Pascal-Testlauf gibt es optional `.demo/02-presenter-capstone.json`. Er läuft
ausschließlich in einem separaten Presenter-Checkout; Anleitung und ehrliche
Toolchain-Fallbacks stehen in [`.demo/presenter-capstone.md`](.demo/presenter-capstone.md).

Die Markdown-Übungen unter [exercises/](exercises/README.md) sind die Quelle des Guides und können vollständig ohne Oberfläche gelesen werden. Die Projektregeln stehen in der root-`AGENTS.md`; Übung 4 zeigt, wie solche Regeln überprüft und ergänzt werden. Ein projektspezifischer Review-Skill wird erst in Übung 5 erstellt.

## Projektstruktur und Befehle

```text
CatalogDemo.lpi/.lpr      Lazarus-Konsolenprojekt
src/                     SessionData und SessionCatalog (Object Pascal)
tests/CatalogTests.*     Lazarus-Testprojekt, ohne zusätzliche Testbibliothek
exercises/               Gemeinsame Aufgaben, Prompts, Hinweise und Checkpoints
AGENTS.md                Gemeinsame Anweisungen für Coding-Agents
backlog/                 Akzeptanzkriterien für das Agent-Feature
guide/                   Gemeinsamer Renderer und Browser-Fallback
.github/extensions/       Projektbezogene Copilot-Canvas-Extension
scripts/pascal.mjs        plattformübergreifende Lazarus-/FPC-Aufrufe
.vscode/tasks.json       Guide, Build und Tests
```

```powershell
npm run build       # Lazarus-Anwendung bauen
npm test            # Lazarus-Testprojekt bauen UND starten
npm run test:fpc    # zusätzlicher direkter FPC-Check im Delphi-Modus
npm run test:guide  # Inhalte, Fortschritt und HTTP-Grenzen prüfen
```

Ohne Node.js lassen sich `CatalogDemo.lpi` und `tests/CatalogTests.lpi` direkt in Lazarus öffnen und bauen. Danach das Testprogramm in `bin/` starten. Ein erfolgreicher Compilerlauf allein führt noch keine Tests aus.

Der Code nutzt den FPC-Delphi-Modus, dynamische Arrays und RTL-Funktionen statt VCL/FMX oder Delphi-exklusiver Bibliotheken. Das ist keine Zusicherung vollständiger Kompatibilität aller Delphi-Versionen; RAD Studio gehört nicht zur Workshop-Toolchain.

## Sicher arbeiten

Keine Zugangsdaten oder vertraulichen Projektinhalte in Prompts, Notizen oder Exporte eintragen. Canvas und Browser-Fallback binden ausschließlich an Loopback, schützen API-Zugriffe per Token und starten keine Befehle. Compiler- und Copilot-Aufrufe laufen bewusst im eigenen Terminal mit den dort erteilten Rechten. Änderungen lesen, selbst testen und den Diff prüfen.

Bei beschädigtem oder nach Inhaltsänderungen veraltetem Fortschritt stoppt der Guide mit einer Fehlermeldung. `.workshop/progress.json` zuerst sichern; für einen neuen Versuch die gesicherte Datei manuell umbenennen. Keine automatischen Resets.

## Referenzen

- [Canvas-Erweiterungen in der Copilot App](https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions)
- [Copilot-Anpassungen und Unterschiede der Oberflächen](https://docs.github.com/en/copilot/reference/customization-cheat-sheet)
- [Lazarus](https://www.lazarus-ide.org/) · [Free Pascal](https://www.freepascal.org/)
