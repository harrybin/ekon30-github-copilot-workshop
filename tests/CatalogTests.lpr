program CatalogTests;

{$IFDEF FPC}{$MODE DELPHI}{$H+}{$ENDIF}

uses SysUtils, SessionData, SessionCatalog;

var
  Checks: Integer = 0;

procedure Check(Condition: Boolean; const Description: string);
begin
  if not Condition then
    raise Exception.Create('FAIL: ' + Description);
  Inc(Checks);
  WriteLn('PASS: ', Description);
end;

procedure TestCatalog;
var
  Sessions, Filtered: TSessions;
  Favorites, Added, Removed: TSessionIds;
begin
  Sessions := ExampleSessions;
  Check(FindSessionIndex(Sessions, 'delphi-201') = 1, 'Find existing session');
  Check(FindSessionIndex(Sessions, 'missing') = -1, 'Missing session returns -1');
  Check(FindSessionIndex(nil, 'missing') = -1, 'Find in empty input');
  Filtered := FilterSessions(Sessions, '  MARA ');
  Check(Length(Filtered) = 2, 'Search speaker, ignoring ASCII case and spaces');
  Filtered := FilterSessions(Sessions, 'object PASCAL');
  Check((Length(Filtered) = 1) and (Filtered[0].Id = 'delphi-201'),
    'Search title');
  Filtered := FilterSessions(Sessions, 'KI');
  Check(Length(Filtered) = 2, 'Search track');
  Check(Length(FilterSessions(Sessions, 'absent')) = 0, 'No matches');
  Check(Length(FilterSessions(nil, 'KI')) = 0, 'Filter empty input');
  Filtered := FilterSessions(Sessions, ' ');
  Check(Length(Filtered) = 3, 'Empty query returns all sessions');
  Filtered[0].Title := 'Changed';
  Check(Sessions[0].Title = 'Spec-Driven Development', 'Result does not alias input');
  Favorites := nil;
  SetLength(Favorites, 1);
  Favorites[0] := 'sdd-101';
  Added := ToggleFavorite(Favorites, 'delphi-201');
  Check((Length(Added) = 2) and (Added[1] = 'delphi-201'), 'Add favorite');
  Removed := ToggleFavorite(Added, 'sdd-101');
  Check((Length(Removed) = 1) and (Removed[0] = 'delphi-201'), 'Remove favorite');
  Added[0] := 'Changed';
  Check((Length(Favorites) = 1) and (Favorites[0] = 'sdd-101'),
    'Favorites input remains unchanged');
  Check(Length(ToggleFavorite(nil, 'first')) = 1, 'Add first favorite');
end;

begin
  try
    TestCatalog;
    WriteLn(Checks, ' checks passed.');
  except
    on E: Exception do
    begin
      WriteLn(StdErr, E.Message);
      Halt(1);
    end;
  end;
end.
