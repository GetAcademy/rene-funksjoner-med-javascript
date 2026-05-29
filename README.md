# Rene funksjoner — 20-minutters worklog

**Mål:** Forstå hva en ren funksjon er, hva sideeffekter er, og hvordan du
skiller beregning fra effekt for å få testbar, forutsigbar kode.

## Setup

```bash
node src/index.js
```

Velg en del fra menyen. Les output og forstå *hvorfor* den ser ut som den gjør.

## Presentasjon med presenterm

```bash
presenterm slides/deck.md
```

## Innhold

| Del | Tema | Tid |
|:---|:---|---:|
| 00 | Intro — hva/hvorfor/hvordan | 1 min |
| 01 | Uren `processOrder` — test-problemet | 4 min |
| 02 | Mini 1: IO som sideeffekt | 3 min |
| 03 | Mini 2: Mutasjon global/referanse | 3 min |
| 04 | Mini 3: Forutsigbarhet & testbarhet | 3 min |
| 05 | Refaktorert `processOrder` — ren + test | 4 min |
| | Oppsummering | 2 min |

## Filer

- `src/index.js` — meny for å kjøre delene
- `src/00-intro.js` .. `src/05-pure-order.js` — eksempelkode
- `slides/` — presenterm-klare slides
