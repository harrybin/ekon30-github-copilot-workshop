# 7. Capstone: vom Auftrag zum Review

## Verstehen

Jetzt kombinieren wir Kontext, begrenzte Delegation und überprüfbare Ergebnisse. Der Guide bestätigt keine Codequalität: Abhaken ist eine persönliche Selbstauskunft.

## Umsetzen

1. Eine kleine neue Funktion wählen: FilterSessionsByTrack liefert nur exakt passende Tracks und verändert die Eingabe nicht.
2. Instructions und Prompt oder Skill aus den vorigen Übungen gezielt nutzen.
3. Plan und Tests für mehrere Treffer, keinen Treffer und leere Eingabe vereinbaren.
4. Implementieren lassen, npm test und npm run build ausführen und den Diff zu zweit reviewen.
5. Im Guide Testausgabe, wichtigste Review-Beobachtung und offene Punkte notieren.
6. Die persönliche Zusammenfassung exportieren. Ein lokaler Diff genügt; GitHub-Schreibrechte sind nicht erforderlich.

## Prompt

```text
Plane FilterSessionsByTrack(const Sessions: TSessions;
const Track: string): TSessions in src/SessionCatalog.pas.
Exakter, case-sensitiver Trackvergleich, Reihenfolge erhalten,
Eingabe nicht ändern. Tests in tests/CatalogTests.lpr.
Nutze unsere Projektregeln; lass Guide und Toolchain unverändert.
Nenne zuerst Scope und Verifikation und warte auf Freigabe.
```

## Prüfen

- Neue Randfälle laufen und npm test sowie npm run build sind erfolgreich.
- Eine zweite Person hat den Diff gelesen oder ich habe den Solo-Review benannt.
- Die exportierte Zusammenfassung trennt Beobachtungen und offene Punkte.

## Tipp

Fehlt Zeit, nur einen klaren Testfall samt kleinster Implementierung abschließen und den Rest offen notieren. Keine grünen Checkpoints erfinden, nur um den Guide vollständig zu färben.
