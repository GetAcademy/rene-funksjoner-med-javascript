---
options:
  end_slide_shorthand: true
---

# Funksjonell programmering i C#

20-minutters worklog

---

## Navigasjon i presenterm

| Tast | Handling |
|:---|---|
| `→` / `↓` / `j` / mellomrom | Neste slide |
| `←` / `↑` / `k` | Forrige slide |
| `g` | Første slide |
| `G` | Siste slide |
| `1`..`9` | Hopp til slide-nummer |
| `q` / `Esc` | Avslutt |

---

## Mål

Forstå rene funksjoner, sideeffekter, immutability — og hvorfor
funksjonell tenkning gjør koden lettere å teste, resonnere om og dele.

Alt du trenger er terminalen og `dotnet`.

---

## Setup

```bash
cd ~/Projects/GET/csharp-fp-worklog
dotnet run
```

Velg en del fra menyen. Les output og forstå *hvorfor* den ser ut som den gjør.

Åpne gjerne `src/`-filene side om side.

---

## Disposisjon

| Del | Tema | Tid |
|:---|:---|:---:|
| 1 | Rene funksjoner vs sideeffekter | 5 min |
| 2 | Immutability med objekter | 5 min |
| 3 | Immutability med lister | 5 min |
| 4 | Refaktorering: imperativ → funksjonell | 3 min |
| | Oppsummering | 1 min |
