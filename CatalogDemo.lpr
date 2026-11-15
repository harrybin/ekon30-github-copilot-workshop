program CatalogDemo;

{$IFDEF FPC}{$MODE DELPHI}{$H+}{$ENDIF}

uses SessionData, SessionCatalog;

var
  Sessions: TSessions;
  I: Integer;
begin
  Sessions := FilterSessions(ExampleSessions, 'KI');
  WriteLn('EKON 30 - Session-Katalog (synthetische Beispieldaten)');
  for I := 0 to High(Sessions) do
    WriteLn(Sessions[I].Title, ' | ', Sessions[I].Speaker);
end.
