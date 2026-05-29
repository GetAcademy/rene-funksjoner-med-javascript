---
options:
  end_slide_shorthand: true
---

# Hva er en ren funksjon?

To regler:

1. **Samme output gitt samme input** — alltid
2. **Ingen sideeffekter** — den påvirker ikke verden utenfor

```javascript
function add(a, b) {
  return a + b;
}
```

`add(2, 3)` → `5` hver eneste gang. Alltid.

---

## Hvorfor bry seg?

Tre grunner:

- **Testbar** — ingen setup, ingen mocking
- **Forutsigbar** — du trenger ikke å vite hele programtilstanden
- **Komponerbar** — små rene brikker kan settes sammen til større logikk

> Rene funksjoner er *gratis* å forstå — du ser bare på parameterne.

---

## Hvordan — verktøy vi skal bruke

| Verktøy | Problemet det løser |
|:---|---|
| **Flytte IO** | console.log, filskriving, API-kall ut av funksjonen |
| **Unngå global mutasjon** | `let` på toppnivå, delt tilstand |
| **Kopier data** | Spread (`...`), `.map()`, `.filter()` istedenfor mutasjon |

---

## Setup

```bash
cd ~/Projects/GET/csharp-fp-worklog
node src/index.js
```

Velg en del. Les output. Forstå *hvorfor*.
