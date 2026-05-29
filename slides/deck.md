---
options:
  end_slide_shorthand: true
---

# Rene funksjoner — 20-minutters worklog

Forstå rene funksjoner, sideeffekter, og hvorfor
det er lettere å teste, resonnere om og dele koden.

---

## Setup

```bash
node src/index.js
```

Åpne gjerne `src/`-filene side om side.

---

## Disposisjon

| Del | Tema |
|:---|:---|
| [00 — Intro](00-intro.md) | Hva er en ren funksjon? Hvorfor? Hvordan? |
| [01 — Uren `processOrder`](01-impure-order.md) | Hovedeksempel — test-problemet |
| [02 — IO som sideeffekt](02-side-effect-io.md) | Mini 1: console.log, fil, nettverk |
| [03 — Mutasjon](03-side-effect-mutation.md) | Mini 2: global + referansemutasjon |
| [04 — Forutsigbarhet](04-why-pure.md) | Mini 3: Forutsigbar, testbar, komponerbar |
| [05 — Ren `processOrder`](05-pure-order.md) | Refaktorert — unit test uten mock |
