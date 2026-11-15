# 0. Dein Delphi-Arbeitsplatz

## Verstehen

Wir erweitern einen Session-Katalog in Delphi-kompatiblem Object Pascal. Lazarus baut die Konsolenprojekte mit Free Pascal im Delphi-Modus. Eine RAD-Studio-Lizenz ist nicht nötig. Die Sessiondaten sind erfunden.

Node.js startet nur die Workshop-Führung und die Build-Befehle. Es gibt keine JavaScript-Codeübungen und keine npm-Abhängigkeiten.

## Umsetzen

1. Lazarus inklusive Free Pascal, Git, Node.js 24+ und VS Code installieren. Mit GitHub Copilot anmelden.
2. Im Terminal fpc -iV und lazbuild --version prüfen. Unter Windows den Lazarus-Ordner und den FPC-bin-Ordner der Installation zu PATH hinzufügen; danach VS Code neu starten.
3. Das Workshop-Verzeichnis als eigenen VS-Code-Ordner öffnen.
4. Die folgenden Befehle im Workshop-Verzeichnis ausführen.

```bash
npm test
npm start
```

5. CatalogDemo.lpi in Lazarus öffnen und ebenfalls bauen. Die Anwendung benötigt keine grafische Oberfläche.
6. Im Guide die Prüfkriterien abhaken und den eigenen Nachweis speichern. Nicht bestandene Schritte nicht als erledigt markieren.

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

Fehlt lazbuild, zuerst die Lazarus-Installation und PATH prüfen. npm run test:fpc prüft zusätzlich den direkten FPC-Weg, ersetzt aber nicht den Lazarus-Setup-Checkpoint. Unter Debian/Ubuntu benötigen wir fp-compiler, lcl-utils und lazarus-src; für die IDE zusätzlich Lazarus installieren.
