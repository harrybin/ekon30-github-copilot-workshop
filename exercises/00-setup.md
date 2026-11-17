# 0. Dein Delphi-Arbeitsplatz

## Verstehen

Wir erweitern einen Session-Katalog in Delphi-kompatiblem Object Pascal. Lazarus baut die Konsolenprojekte mit Free Pascal im Delphi-Modus. Eine RAD-Studio-Lizenz ist nicht nötig. Die Sessiondaten sind erfunden.

Node.js startet nur die Workshop-Führung und die Build-Befehle. Es gibt keine JavaScript-Codeübungen und keine npm-Abhängigkeiten.

## Umsetzen

1. **Windows (empfohlen):** Lazarus inklusive Free Pascal, Git, Node.js 24+ und VS Code installieren. Mit GitHub Copilot anmelden. Für den VS-Code-Demolauf zusätzlich `eliostruyf.vscode-demo-time` über die Extensions-Ansicht installieren.
2. In PowerShell `Get-Command fpc,lazbuild`, `fpc -iV` und `lazbuild --version` ausführen. Falls die Befehle fehlen, Lazarus- und FPC-bin-Ordner zum Benutzer-PATH hinzufügen und VS Code neu starten.
3. **macOS:** Die offiziellen Lazarus-/FPC-Pakete sowie Git, Node.js 24+ und VS Code installieren. Im Terminal `command -v fpc lazbuild`, `fpc -iV` und `lazbuild --version` ausführen. Für den VS-Code-Demolauf zusätzlich `eliostruyf.vscode-demo-time` über die Extensions-Ansicht installieren.
4. Das Workshop-Verzeichnis als eigenen VS-Code-Ordner öffnen.
5. Die folgenden Befehle im Workshop-Verzeichnis in PowerShell oder im macOS-Terminal ausführen.

```powershell
npm test
npm start
```

6. `CatalogDemo.lpi` in Lazarus öffnen und ebenfalls bauen. Die Anwendung benötigt keine grafische Oberfläche.
7. Im Guide die Prüfkriterien abhaken und den eigenen Nachweis speichern. Nicht bestandene Schritte nicht als erledigt markieren.

## Prompt

```text
Erkläre die Struktur dieses Lazarus-Konsolenprojekts anhand von
CatalogDemo.lpr, src/SessionData.pas und src/SessionCatalog.pas.
Ändere keine Dateien. Welche Rolle spielen Delphi-Modus und lazbuild?
```

## Prüfen

- npm test meldet 14 erfolgreiche Checks und beendet sich mit Exit-Code 0.
- npm start zeigt zwei KI-Sessions aus den synthetischen Beispieldaten.
- Ich kann eine Pascal-Unit in VS Code öffnen und Copilot dazu befragen.

## Tipp

Fehlt `lazbuild`, zuerst die Lazarus-Installation und den PATH prüfen. `npm run test:fpc` prüft zusätzlich den direkten FPC-Weg, ersetzt aber nicht den Lazarus-Setup-Checkpoint. Unter macOS die offiziellen Lazarus-/FPC-Pakete verwenden und sicherstellen, dass beide Programme im PATH liegen.
