unit SessionCatalog;

{$IFDEF FPC}{$MODE DELPHI}{$H+}{$ENDIF}

interface

uses SessionData;

function FindSessionIndex(const Sessions: TSessions; const Id: string): Integer;
function FilterSessions(const Sessions: TSessions; const Query: string): TSessions;
function ToggleFavorite(const Favorites: TSessionIds;
  const SessionId: string): TSessionIds;

implementation

uses SysUtils;

function FindSessionIndex(const Sessions: TSessions; const Id: string): Integer;
var
  I: Integer;
begin
  Result := -1;
  for I := 0 to High(Sessions) do
    if Sessions[I].Id = Id then
      Exit(I);
end;

function FilterSessions(const Sessions: TSessions; const Query: string): TSessions;
var
  NormalizedQuery, SearchText: string;
  I, Count: Integer;
begin
  Result := nil;
  NormalizedQuery := LowerCase(Trim(Query));
  Count := 0;
  for I := 0 to High(Sessions) do
  begin
    SearchText := LowerCase(Sessions[I].Title + ' ' + Sessions[I].Speaker
      + ' ' + Sessions[I].Track);
    if (NormalizedQuery = '') or (Pos(NormalizedQuery, SearchText) > 0) then
    begin
      SetLength(Result, Count + 1);
      Result[Count] := Sessions[I];
      Inc(Count);
    end;
  end;
end;

function ToggleFavorite(const Favorites: TSessionIds;
  const SessionId: string): TSessionIds;
var
  I, Count: Integer;
  Found: Boolean;
begin
  Result := nil;
  Count := 0;
  Found := False;
  SetLength(Result, Length(Favorites) + 1);
  for I := 0 to High(Favorites) do
    if Favorites[I] = SessionId then
      Found := True
    else
    begin
      Result[Count] := Favorites[I];
      Inc(Count);
    end;
  if not Found then
  begin
    Result[Count] := SessionId;
    Inc(Count);
  end;
  SetLength(Result, Count);
end;

end.
