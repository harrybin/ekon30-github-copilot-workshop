# Presenter-Live-Demo: Capstone

## Zweck

Diese optionale Sequenz zeigt einen **echten, manuell gestarteten Copilot-
Agent-Auftrag**, den tatsächlichen Diff und – wenn die Pascal-Toolchain
verfügbar ist – die wirkliche Testausgabe. Sie enthält weder eine vorgefertigte
Copilot-Antwort noch eine behauptete grüne Testausgabe. Demo Time öffnet nur
Dateien; es sendet keine Prompts, genehmigt keine Änderungen und startet keine
Befehle.

## Sicherer Presenter-Checkout (Windows / PowerShell)

Teilnehmer arbeiten weiter in ihren eigenen Checkouts. Für den Vortrag einen
neuen, separaten Presenter-Checkout anlegen und dort ein eigenes VS-Code-Fenster
öffnen. Der Zielordner muss neu und leer sein; vorhandene Verzeichnisse nicht
überschreiben.

```powershell
$presenterPath = Join-Path $HOME 'ekon30-copilot-presenter'
if (Test-Path $presenterPath) {
  throw "Presenter-Ordner existiert bereits. Wähle einen neuen Pfad: $presenterPath"
}
git clone https://github.com/harrybin/ekon30-github-copilot-workshop.git $presenterPath
Set-Location $presenterPath
git switch -c demo/copilot-capstone
git status --short
Get-Command code-insiders,fpc,lazbuild -ErrorAction SilentlyContinue
code-insiders --list-extensions --show-versions | Select-String 'GitHub.copilot|eliostruyf.vscode-demo-time'
code-insiders --new-window .
```

Die Ausgabe muss die GitHub-Copilot-Erweiterung und Demo Time im verwendeten
Insiders-Profil zeigen. Danach Copilot Chat öffnen und die Anmeldung prüfen.
Fehlt GitHub Copilot, die Erweiterung nicht als Teil der Demo installieren;
stattdessen den Copilot-Fallback verwenden. Den Act
`02-presenter-capstone` manuell starten. Für eine Wiederholung einen weiteren
neuen Presenter-Ordner klonen; keine Reset-, Clean- oder Löschbefehle ausführen.
So bleiben Änderungen und `.workshop/progress.json` aller Teilnehmenden
unangetastet.

## Live-Ablauf

1. In `exercises/07-capstone.md` den vorhandenen Prompt zeigen und im Copilot
   Agent-Modus selbst starten. Copilot zunächst nur planen lassen.
2. Plan und geplante Änderungen auf den Scope
   `src/SessionCatalog.pas` und `tests/CatalogTests.lpr` prüfen. Nur dann die
   Umsetzung freigeben; andernfalls Auftrag korrigieren oder abbrechen.
3. Die echte Copilot-Antwort und den tatsächlich entstandenen Diff zeigen.
   Keine Beispielantwort und keinen erwarteten Patch als Copilot-Ergebnis
   ausgeben. Prüfen: exakter case-sensitiver Trackvergleich, Reihenfolge bleibt
   erhalten, Eingabearray unverändert; Tests decken Treffer, Nichttreffer und
   leere Eingabe ab. Die Beispieldaten enthalten zwei `KI`- und einen
   `Delphi`-Eintrag.
4. Im Presenter-Terminal die Tests ausführen und deren wirkliche Ausgabe zeigen:

   ```powershell
   npm test
   npm run test:fpc
   ```

   `npm test` baut mit Lazarus (`lazbuild`); `npm run test:fpc` kompiliert und
   startet die Pascal-Tests direkt mit `fpc` im Delphi-Modus. Nur tatsächlich
   beendete Befehle und ihre echte Ausgabe als erfolgreich bezeichnen. Danach
   `git diff --check` und `git status --short` zeigen sowie den Pascal-Diff
   reviewen.

## Fallbacks ohne fingierte Resultate

- **Copilot nicht angemeldet, nicht verfügbar oder noch ohne Antwort:** Den
  Auftrag und die Akzeptanzkriterien zeigen und gemeinsam den Plan diskutieren.
  Keine generierte Antwort, Codeänderung oder erfolgreiche Copilot-Ausführung
  behaupten. Ein manuell geschriebener Code ist ausdrücklich als manuell
  erstellt zu kennzeichnen.
- **Free Pascal fehlt:** `Get-Command fpc,lazbuild` sichtbar prüfen. Einen
  gewünschten fehlgeschlagenen Testlauf nicht als Erfolg darstellen; wenn
  `npm run test:fpc` mit fehlendem `fpc` abbricht, genau diesen Blocker nennen.
  `npm test` braucht unabhängig davon `lazbuild`. Guide- oder Demo-Time-Tests
  prüfen nicht die Pascal-Funktion und ersetzen den Pascal-Test nicht.
- **Nur eine Toolchain verfügbar:** Ausschließlich den Testbefehl ausführen,
  dessen Voraussetzung erfüllt ist. Ergebnis und nicht ausgeführte Prüfungen
  getrennt benennen; ein einzelner erfolgreicher Pascal-Testlauf ist kein
  erfolgreicher Lazarus-Build.
- **Copilot-Änderung außerhalb des Scopes oder Testfehler:** Anhalten, Diff und
  Fehlermeldung zeigen. Nicht automatisch zurücksetzen und nicht den
  Teilnehmer-Checkout für einen Neustart verwenden.

Der Live-Erfolg hängt von Copilot-Anmeldung und Presenter-Toolchain ab. Dieses
Dokument protokolliert keinen vorweggenommenen Erfolg.
