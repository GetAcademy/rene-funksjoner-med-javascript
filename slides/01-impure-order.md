---
options:
  end_slide_shorthand: true
---

# Hovedeksempel: Uren `processOrder`

En funksjon som gjør **tre** ting samtidig:

```javascript
let taxRate = 0.25;

function processOrder(order) {
  taxRate = 0.20;                          // ⚠️ muterer global
  console.log("Processing order...");      // ⚠️ IO
  for (let i = 0; i < order.items.length; i++) {
    order.items[i].price *= 1 + taxRate;   // ⚠️ muterer input
  }
  return order;
}
```

---

## Problem: Hvordan teste dette?

```javascript
function testProcessOrder() {
  const order = {
    items: [
      { name: "T-skjorte", price: 100, qty: 2 },
      { name: "Bukse",    price: 200, qty: 1 },
    ],
  };

  const result = processOrder(order);

  // ❌ Hva er forventet? Avhenger av taxRate før kallet
  // ❌ console.log — må fanges opp / mockes
  // ❌ order.items er mutert — kan ikke gjenbrukes
  // ❌ global taxRate endret — påvirker andre tester
}
```

---

## Oppsummering av problemene

| Problem | Konsekvens |
|:---|---:|
| **IO** (console.log) | Må mocke/stdout-fangst |
| **Global mutasjon** (`taxRate`) | Må nulstille mellom tester |
| **Input-mutasjon** (`order.items[i].price`) | Kan ikke gjenbruke testdata |
| **Ingen returverdi som kan sjekkes** | Må inspisere mutert objekt |

> Én uren funksjon = en skjør test som brekker når noe annet endres.
