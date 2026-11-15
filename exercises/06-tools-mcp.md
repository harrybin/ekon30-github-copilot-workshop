# 6. Tools und MCP: bewusst freigeben

## Verstehen

Das Terminal-Tool kann lazbuild starten; dafür ist kein MCP-Server erforderlich. MCP ist sinnvoll, wenn eine zusätzliche Datenquelle oder Fähigkeit fehlt. Eine Konfigurationsdatei allein belegt noch keine funktionierende Verbindung.

## Umsetzen

1. Aufschreiben, welches Tool den lokalen Lazarus-Build ausführt und welche Rechte es benötigt.
2. Mit dem folgenden Prompt den nächsten Build nur vorbereiten, nicht automatisch erlauben.
3. Optional einen von den Vortragenden bereitgestellten, lesenden MCP-Server mit erfundenen Daten ansehen.
4. Herkunft, Datenfluss und konkrete Toolrechte prüfen. Keine unbekannten Server installieren und keine produktiven Schreibzugriffe erteilen.
5. Ohne bereitgestellten Server die Berechtigungsanalyse als Trockenübung dokumentieren.

## Prompt

```text
Welche lokalen Tools brauchst du, um npm test in diesem
Lazarus-Projekt auszuführen? Nenne Befehl, Arbeitsverzeichnis
und erwartete Schreibzugriffe. Führe noch nichts aus.
Erkläre getrennt, wann eine externe MCP-Datenquelle sinnvoll wäre.
Keine Installation und keine produktiven Schreibaktionen.
```

## Prüfen

- Ich kann lokalen Compileraufruf und externe MCP-Fähigkeit unterscheiden.
- Mein Nachweis nennt Rechte, Datenfluss und erforderliche Bestätigung.
- Eine Trockenübung ist als solche markiert, nicht als erfolgreicher Live-MCP-Test.

## Tipp

Dieser Block ist in der gemeinsamen Zeit enthalten; nur die Live-MCP-Anbindung ist optional. Ein sauber dokumentierter Trockenlauf erfüllt die Lernaufgabe, aber behauptet keine reale Serververbindung.
