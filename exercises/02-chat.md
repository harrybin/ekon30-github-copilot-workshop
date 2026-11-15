# 2. Chat: erst verstehen, dann ändern

## Verstehen

const schützt bei dynamischen Arrays nicht vor jeder Form von geteiltem Speicher. Wir unterscheiden bestätigtes Verhalten, Vermutungen und noch nicht vereinbarte Anforderungen. Die Suche garantiert im Starter nur ASCII-Groß-/Kleinschreibung, keine vollständige Unicode-Normalisierung.

## Umsetzen

1. src/SessionCatalog.pas und tests/CatalogTests.lpr als Chat-Kontext hinzufügen.
2. Den Prompt zunächst im fragenden Modus ohne Dateiänderungen verwenden.
3. Die Aussagen zu FilterSessions am Code nachvollziehen.
4. Einen zusätzlichen Randfall auswählen, etwa eine Session mit leerem Titel und Speaker, deren Track dennoch gefunden werden muss.
5. Genau diesen Test ergänzen lassen, npm test ausführen und den Diff prüfen.

## Prompt

```text
Erkläre FilterSessions in src/SessionCatalog.pas und die zugehörigen
Checks in tests/CatalogTests.lpr. Ändere noch nichts.
Wo werden dynamische Arrays kopiert? Welche Eingaben sind belegt,
welche Anforderungen bleiben offen? Erfinde keine Unicode-Garantien.
Schlage genau einen zusätzlichen fachlichen Test vor.
```

## Prüfen

- Ich kann belegte Fakten von offenen Anforderungen unterscheiden.
- Ein zusätzlicher Test läuft tatsächlich und npm test bleibt erfolgreich.
- Keine ungefragte Suche-Neuentwicklung oder zusätzliche Bibliothek im Diff.

## Tipp

Im Starter verknüpft die Suche Titel, Speaker und Track zu einem String. Fragen zu Sonderzeichen oder Treffern über Feldgrenzen sind gute Diskussionspunkte, aber kein Auftrag, die gesamte Suchsemantik ungefragt zu verändern.
