# Feature: Sessions pro Track zählen

## Ziel

CountSessionsByTrack zählt Sessions je Track ohne die Eingabe zu verändern.
Die Funktion wird im interface- und implementation-Teil von src/SessionCatalog.pas ergänzt.

```pascal
type
  TTrackCount = record
    Track: string;
    Count: Integer;
  end;
  TTrackCounts = array of TTrackCount;

function CountSessionsByTrack(const Sessions: TSessions): TTrackCounts;
```

## Akzeptanzkriterien

- Ergebnis: ein Eintrag pro exakt gleichem Track, in Reihenfolge seines ersten Auftretens.
- Die Beispieldaten ergeben KI = 2 und Delphi = 1.
- KI und ki sind unterschiedliche Tracks; ein leerer Track ist ein eigener Schlüssel.
- Eine leere Eingabe liefert ein leeres dynamisches Array.
- Sessions und deren Felder bleiben unverändert.
- Tests für mehrere und wiederholte Tracks, Groß-/Kleinschreibung, leeren Track, leere Eingabe und unveränderte Eingabe ergänzen und tatsächlich aufrufen.
- npm test ausführen; geänderte Dateien, Testausgabe und offene Punkte nennen.

## Nicht-Ziele

Keine GUI, Sortierung, neuen Abhängigkeiten oder Delphi-exklusiven Bibliotheken.
Guide, Buildskripte und bestehende Test-Erwartungen unverändert lassen.
