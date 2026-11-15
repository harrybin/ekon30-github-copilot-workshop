# 1. Completions: eine kleine Pascal-Funktion

## Verstehen

Inline-Vorschläge entstehen aus dem sichtbaren Kontext. Wir ergänzen bewusst eine kleine Funktion, bevor wir größere Änderungen an einen Agenten delegieren.

## Umsetzen

1. src/SessionCatalog.pas und tests/CatalogTests.lpr öffnen.
2. Die Signatur aus dem folgenden Block im interface-Teil von SessionCatalog ergänzen.
3. Im implementation-Teil einen Kommentar zu Ziel und Ausgabe schreiben. Den Funktionskörper mit Copilot-Inline-Vorschlägen entwickeln.
4. Mindestens einen Vorschlag prüfen und bewusst annehmen, verändern oder verwerfen.
5. Tests ergänzen: reguläre Session sowie eine Session mit leerem Speaker.
6. npm test und git diff ausführen.

```pascal
function FormatSessionCaption(const Session: TSession): string;
```

## Prompt

```text
Noch nicht in den Chat senden: Beginne im Editor mit einem Kommentar.
FormatSessionCaption liefert "Title | Speaker"; ist Speaker leer,
liefert sie nur Title. Eingabedaten dürfen sich nicht ändern.
Nutze Copilot-Completions statt eines vollständigen Agent-Auftrags.
```

## Prüfen

- Die Funktion ist in interface und implementation deklariert und implementiert.
- Die zwei neuen Fälle laufen in TestCatalog; npm test ist erfolgreich.
- Ich kann eine selbst korrigierte oder verworfene Copilot-Annahme erklären.

## Tipp

Das Testprogramm zählt Check-Aufrufe. Neue Tests innerhalb von TestCatalog ergänzen oder eigene Testprozeduren im Hauptprogramm explizit aufrufen. Ein kompilierter, aber nie aufgerufener Test ist kein Nachweis.
