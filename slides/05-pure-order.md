---
options:
  end_slide_shorthand: true
---

# Refaktorert: Ren `processOrder`

Splitt funksjonen i **ren kjerne** + **IO hos kalleren**.

---

## Ren kjerne

```javascript
function calculateTotal(order, taxRate) {
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  return subtotal * (1 + taxRate);
}
```

- ✅ Samme input → samme output
- ✅ Null sideeffekter
- ✅ Returnerer bare et tall

---

## IO hos kalleren

```javascript
function processOrder(order, taxRate) {
  const total = calculateTotal(order, taxRate);
  console.log(`Total: ${total}`);
  return total;
}
```

- `calculateTotal` trenger ikke vite om console, DOM eller API
- Kalleren bestemmer hva som skjer med resultatet

---

## Unit test — uten mocking!

```javascript
function testCalculateTotal() {
  const order = {
    items: [
      { name: "T-skjorte", price: 100, qty: 2 },
      { name: "Bukse",    price: 200, qty: 1 },
    ],
  };

  // 100*2 + 200*1 = 400 + 25% mva = 500
  const result = calculateTotal(order, 0.25);

  if (result !== 500) throw `FAIL: expected 500, got ${result}`;

  // ✅ order er urørt — kan gjenbrukes!
  console.log("✅ testCalculateTotal passed");
}
```

---

## Før vs. Etter

| Før (uren) | Etter (ren) |
|:---|---:|
| `processOrder(order)` | `calculateTotal(order, taxRate)` |
| Må mocke console | Returnerer bare et tall |
| Muterer global `taxRate` | `taxRate` er en parameter |
| Muterer `order.items` | `order` er urørt |
| Skjør test | Robust test, null mocking |

> Rene funksjoner er *gratis* å forstå og *trivielle* å teste.
