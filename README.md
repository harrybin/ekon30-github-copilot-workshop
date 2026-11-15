# GitHub Copilot von A bis Z — für Delphi-Entwickler:innen

Vier Stunden mit Harald Binkle und Thomas Tomow. Wir erweitern einen kleinen Session-Katalog in **Delphi-kompatiblem Object Pascal**. Gebaut wird mit **Lazarus / Free Pascal**, ohne RAD-Studio-Lizenz. Alle Sessiondaten im Starter sind erfunden.

Die interaktive Workshop-Führung übernimmt das Lernprinzip von [Copilot Governance at Scale](https://github.com/octodemo/copilot-governance-at-scale): verstehen, umsetzen, prüfen und persönliche Beobachtungen festhalten. Die Implementierung und Inhalte hier sind eigenständig.

## Voraussetzungen

- Lazarus 3+ inklusive Free Pascal 3.2.2+; `lazbuild` und `fpc` müssen im `PATH` sein.
- Git und Node.js 24+ für den Guide und plattformübergreifende Build-Aufrufe. Keine npm-Pakete nötig.
- VS Code mit angemeldetem GitHub Copilot; alternativ für Chat-/Agent-Übungen die GitHub Copilot App mit einem **lokalen** Checkout.
- Code Completion üben wir in VS Code. Die Copilot App ersetzt dafür keinen Editor.

Unter Windows Lazarus regulär installieren. Bei Bedarf den Installationsordner mit `lazbuild.exe` sowie den FPC-Ordner mit `fpc.exe` zum Benutzer-PATH hinzufügen und VS Code neu starten. Die tatsächlichen Ordner hängen von Installation und Architektur ab. Mit `lazbuild --version` und `fpc -iV` prüfen.

Unter Debian/Ubuntu für die Kommandozeile:

```bash
sudo apt-get update
sudo apt-get install fp-compiler lcl-utils lazarus-src
```

Für die grafische Lazarus-IDE zusätzlich das reguläre Lazarus-Paket installieren. Unter macOS die offiziellen Lazarus-/FPC-Pakete und deren Systemvoraussetzungen verwenden.

## Start

Die geplante öffentliche Repository-Adresse lautet wie folgt; solange das separate Repository noch nicht veröffentlicht ist, befindet sich derselbe Starter im Präsentationsrepo unter `demo-projects/ekon30-github-copilot-workshop/`.

```bash
git clone https://github.com/harrybin/ekon30-github-copilot-workshop.git
cd ekon30-github-copilot-workshop
npm test
npm start
npm run guide
```

`npm test` baut das Testprojekt mit `lazbuild` und führt zunächst **14 Verhaltenschecks** aus. `npm start` baut und startet die Pascal-Konsolenanwendung. `npm run guide` startet einen lokalen Server und gibt eine vollständige URL inklusive Zugriffstoken aus. **Diese vollständige URL öffnen**, nicht nur die Portnummer.

## Geführte Oberfläche neben dem Code

**VS Code:** Workshop-Verzeichnis als eigenen Ordner öffnen. Über **Tasks: Run Task → Workshop: Guide starten** den Server starten, dann **Simple Browser: Show** in der Befehlspalette wählen und die ausgegebene vollständige URL einfügen. Den Browser neben der Pascal-Unit anordnen. Alternativ dieselbe URL im normalen Browser öffnen. **Tasks: Run Test Task** führt die Pascal-Tests aus.

**Copilot App:** Im lokalen Checkout arbeiten, `npm run guide` im Terminal starten und die ausgegebene URL im Browser-Arbeitsbereich öffnen, sofern dieser in der App-Version verfügbar ist; andernfalls im Systembrowser. Ein Server in einer Remote-Session ist nicht unter `127.0.0.1` des eigenen Rechners erreichbar. Dafür den Guide lokal starten.

**Wichtige Abgrenzung:** Dies ist ein portabler Browser-Guide, **keine registrierte native Copilot-Canvas-Erweiterung** wie im Vorbild. Er benötigt weder SDK-Installation noch eine VS-Code-Extension. Agenten können den Guide nicht über Canvas-Actions verändern. Prompts werden bewusst kopiert; der Guide führt keine Shellbefehle aus und erteilt keine Toolrechte.

Die Führung bietet:

- Acht Übungen mit den Schritten **Verstehen → Umsetzen → Prüfen**.
- Kopierbare Copilot-Prompts und aufklappbare Hinweise.
- Persönliche Checklisten, Notizen und Markdown-Export.
- Lokale Speicherung in `.workshop/progress.json`, unabhängig vom Browserfenster. Zum gleichen Checkout zurückkehren, um weiterzuarbeiten.

Ein Checkpoint gilt nur dann als **selbst bestätigt**, wenn alle Kriterien angehakt sind und ein eigener Nachweis eingetragen ist. Das ist keine automatische Build-Prüfung. Bei Speicherfehlern bleiben Eingaben sichtbar; erst nach erfolgreichem Speichern weiterwechseln. Bei Konflikten mit einem zweiten Fenster Notizen kopieren, neu laden und erneut eintragen.

## Workshop-Pfad · 240 Minuten

| Abschnitt | Minuten | Ergebnis |
|---|---:|---|
| 0 · Setup | 15 | Lazarus-Build, Tests, Guide |
| 1 · Completions | 30 | Pascal-Funktion und neue Checks |
| 2 · Chat mit Kontext | 35 | Verstandenes Verhalten, zusätzlicher Randfall |
| Pause | 10 | |
| 3 · Agent Mode | 40 | Track-Zählung mit Tests und Review |
| 4 · Instructions & Prompts | 35 | Projektregeln und Review-Prompt |
| Pause | 10 | |
| 5 · Skills & Custom Agents | 25 | Wiederholbarer Review-Ablauf |
| 6 · Tools & MCP | 20 | Berechtigungsanalyse; Live-MCP optional |
| 7 · Capstone | 20 | Eigenes Feature und exportierte Notizen |

Die Markdown-Übungen unter [exercises/](exercises/README.md) sind die Quelle des Guides und können vollständig ohne Oberfläche gelesen werden. Instructions und Skills für die Codearbeit entstehen bewusst erst in Übung 4/5.

## Projektstruktur und Befehle

```text
CatalogDemo.lpi/.lpr      Lazarus-Konsolenprojekt
src/                     SessionData und SessionCatalog (Object Pascal)
tests/CatalogTests.*     Lazarus-Testprojekt, ohne zusätzliche Testbibliothek
exercises/               Aufgaben, Prompts, Hinweise und Checkpoints
backlog/                 Akzeptanzkriterien für das Agent-Feature
guide/                   Browser-Führung; keine Teilnehmer-Codeaufgabe
scripts/pascal.mjs        plattformübergreifende Lazarus-/FPC-Aufrufe
.vscode/tasks.json       Guide, Build und Tests
```

```bash
npm run build       # Lazarus-Anwendung bauen
npm test            # Lazarus-Testprojekt bauen UND starten
npm run test:fpc    # zusätzlicher direkter FPC-Check im Delphi-Modus
npm run test:guide  # Inhalte, Fortschritt und HTTP-Grenzen prüfen
```

Ohne Node.js lassen sich `CatalogDemo.lpi` und `tests/CatalogTests.lpi` direkt in Lazarus öffnen und bauen. Danach das Testprogramm in `bin/` starten. Ein erfolgreicher Compilerlauf allein führt noch keine Tests aus.

Der Code nutzt den FPC-Delphi-Modus, dynamische Arrays und RTL-Funktionen statt VCL/FMX oder Delphi-exklusiver Bibliotheken. Das ist keine Zusicherung vollständiger Kompatibilität aller Delphi-Versionen; RAD Studio gehört nicht zur Workshop-Toolchain.

## Sicher arbeiten

Keine Zugangsdaten oder vertraulichen Projektinhalte in Prompts, Notizen oder Exporte eintragen. Der Guide bindet ausschließlich an Loopback, schützt API-Zugriffe per Token und startet keine Befehle. Compiler- und Copilot-Aufrufe laufen bewusst im eigenen Terminal mit den dort erteilten Rechten. Änderungen lesen, selbst testen und den Diff prüfen.

Bei beschädigtem oder nach Inhaltsänderungen veraltetem Fortschritt stoppt der Guide mit einer Fehlermeldung. `.workshop/progress.json` zuerst sichern; für einen neuen Versuch die gesicherte Datei manuell umbenennen. Keine automatischen Resets.

## Referenzen

- [Canvas-Erweiterungen in der Copilot App](https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions)
- [Copilot-Anpassungen und Unterschiede der Oberflächen](https://docs.github.com/en/copilot/reference/customization-cheat-sheet)
- [Lazarus](https://www.lazarus-ide.org/) · [Free Pascal](https://www.freepascal.org/)
