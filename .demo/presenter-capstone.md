# Presenter-Live-Demo: Capstone

## Zweck

Diese optionale Sequenz zeigt einen **echten, manuell gestarteten Copilot-
Agent-Auftrag**, den tatsächlichen Diff und – wenn die Pascal-Toolchain
verfügbar ist – die wirkliche Testausgabe. Sie enthält weder eine vorgefertigte
Copilot-Antwort noch eine behauptete grüne Testausgabe. Demo Time öffnet nur
Dateien; es sendet keine Prompts, genehmigt keine Änderungen und startet keine
Befehle.

## Sicherer Presenter-Checkout

Teilnehmer arbeiten weiter in ihren eigenen Checkouts. Für den Vortrag mit
**Terminal → Run Task → Workshop: Demo-Checkout initialisieren** einen neuen,
separaten Presenter-Checkout erzeugen und den ausgegebenen Ordner in einem
eigenen VS-Code-Fenster öffnen. Der Task kopiert nur den committeten Stand,
keine uncommitteten Änderungen oder Fortschrittsdaten. Im neuen Fenster über
**Workshop: Feature-Branch anlegen** einen neuen Branch wählen; **Workshop:
Git-Status**, **FPC-Version** und **Lazarus-Version** prüfen den Ausgangszustand
und die Toolchain.

In der Extensions-Ansicht prüfen, ob GitHub.copilot-chat und, falls gewünscht, Demo
Time im verwendeten Profil verfügbar sind. Danach Copilot Chat öffnen und die Anmeldung prüfen.
Fehlt GitHub Copilot, die Erweiterung nicht als Teil der Demo installieren;
stattdessen den Copilot-Fallback verwenden. Den Act
`02-presenter-capstone` manuell starten; ohne Demo Time die Schritte unten
manuell durchführen. Für eine Wiederholung **Workshop: Demo neu beginnen**
im Presenter-Checkout ausführen und den neu ausgegebenen Ordner öffnen.
Der bisherige Checkout bleibt erhalten.
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
4. Die Tasks **Workshop: Pascal-Tests** und **Workshop: FPC-Tests** ausführen
   und deren wirkliche Ausgabe zeigen. Im Presenter-Terminal entsprechen sie:

   ```powershell
   npm test
   npm run test:fpc
   ```

   `npm test` baut mit Lazarus (`lazbuild`); `npm run test:fpc` kompiliert und
   startet die Pascal-Tests direkt mit `fpc` im Delphi-Modus. Nur tatsächlich
   beendete Befehle und ihre echte Ausgabe als erfolgreich bezeichnen. Danach
   die Tasks **Workshop: Git-Diff prüfen**, **Workshop: Git-Status** und
   **Workshop: Git-Diff** zeigen sowie den Pascal-Diff reviewen.

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
