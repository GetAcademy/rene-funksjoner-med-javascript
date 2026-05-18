# Funksjonell programmering i C# — 20-minutters worklog

**Mål:** Forstå rene funksjoner, sideeffekter, immutability — og hvorfor
funksjonell tenkning gjør koden lettere å teste, resonnere om og dele.

## Setup

```bash
cd ~/Projects/GET/csharp-fp-worklog
dotnet run
```

Velg en del fra menyen. Les output og forstå *hvorfor* den ser ut som den gjør.

## Presentasjon med presenterm

```bash
presenterm slides/deck.md   # hele presentasjonen
presenterm slides/          # alle deler
```

## Innhold

| Del | Tema | Tid |
|:---|:---|:---:|
| 1 | Rene funksjoner vs sideeffekter | 5 min |
| 2 | Immutability med objekter | 5 min |
| 3 | Immutability med lister | 5 min |
| 4 | Refaktorering: imperativ → funksjonell | 3 min |
| | Oppsummering | 1 min |

## Filer

- `src/Program.cs` — meny for å kjøre delene
- `src/Part1_PureFunctions.cs` .. `src/Part4_Refactoring.cs` — eksempelkode
- `src/Models.cs` — delte typer (`MutablePerson`, `ImmutablePerson`)
- `slides/` — presenterm-klare slides med konsepter og kode
