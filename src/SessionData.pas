unit SessionData;

{$IFDEF FPC}{$MODE DELPHI}{$H+}{$ENDIF}

interface

type
  TSession = record
    Id: string;
    Title: string;
    Speaker: string;
    Track: string;
  end;
  TSessions = array of TSession;
  TSessionIds = array of string;

function ExampleSessions: TSessions;

implementation

function ExampleSessions: TSessions;
begin
  Result := nil;
  SetLength(Result, 3);
  Result[0].Id := 'sdd-101';
  Result[0].Title := 'Spec-Driven Development';
  Result[0].Speaker := 'Mara Beispiel';
  Result[0].Track := 'KI';
  Result[1].Id := 'delphi-201';
  Result[1].Title := 'Object Pascal mit Copilot';
  Result[1].Speaker := 'Alex Muster';
  Result[1].Track := 'Delphi';
  Result[2].Id := 'context-301';
  Result[2].Title := 'Kontext fuer Agenten';
  Result[2].Speaker := 'Mara Beispiel';
  Result[2].Track := 'KI';
end;

end.
