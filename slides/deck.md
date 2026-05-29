---
options:
  end_slide_shorthand: true
---

# Rene funksjoner — 20-minutters worklog

Forstå rene funksjoner, sideeffekter, og hvorfor
det er lettere å teste, resonnere om og dele koden.

```bash
node src/index.js
```

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

---

# Sideeffekt Type 1: IO

**Problemet:** Funksjonen gjør mer enn å returnere en verdi.

```javascript
function greet(name) {
  console.log("Hello " + name);   // ← sideeffekt!
}
```

- Du kan ikke fange output i en variabel
- Du kan ikke teste hva den "returnerer"
- Du kan ikke gjenbruke i en annen kontekst (API, DOM, fil)

---

## Løsning: Skill beregning fra effekt

**Ren kjerne:**

```javascript
function greet(name) {
  return "Hello " + name;   // ← bare returnerer data
}
```

**IO hos kalleren:**

```javascript
// Konsoll
console.log(greet("Alice"));

// DOM
document.body.textContent = greet("Alice");

// API-respons
res.json({ message: greet("Alice") });
```

✅ Samme input → alltid samme output ✅ Null sideeffekter

---

# Sideeffekt Type 2: Mutasjon

To varianter: **global** og **referanse**

---

## 3A: Global mutasjon

```javascript
let counter = 0;

function nextId() {
  return ++counter;   // ← endrer noe utenfor
}
```

```javascript
nextId(); // 1
nextId(); // 2
// Samme input (ingen!) → forskjellig output
```

**Problemet:** Avhenger av tidligere kall. Kan ikke kjøres parallelt.

**Ren versjon:**
```javascript
function nextId(counter) {
  return counter + 1;
}
```

---

## 3B: Referansemutasjon

```javascript
function addVat(prices, vat) {
  for (let i = 0; i < prices.length; i++) {
    prices[i] = prices[i] * (1 + vat);  // ← endrer input!
  }
}
```

```javascript
const original = [100, 200, 300];
addVat(original, 0.25);
// original → [125, 250, 375] — ødelagt!
```

**Ren versjon:**
```javascript
function addVat(prices, vat) {
  return prices.map(p => p * (1 + vat));  // ← kopierer
}
```

✅ `original` er fortsatt `[100, 200, 300]`

---

# Hvorfor rene funksjoner? Mini-eksempel

```javascript
function add(a, b) {
  return a + b;
}
```

**Enklest mulig. null sideeffekter. maksimal nytte.**

---

## 1. Forutsigbar

```javascript
add(2, 3)  // → 5
add(2, 3)  // → 5
add(2, 3)  // → 5
```

Alltid samme svar. Trenger ikke å vite noe om programtilstanden.

---

## 2. Testbar

```javascript
// Fullstendig test — null mocking
function testAdd() {
  if (add(2, 3) !== 5) throw "FAIL";
  if (add(-1, 1) !== 0) throw "FAIL";
  if (add(0, 0) !== 0) throw "FAIL";
  console.log("✅ testAdd passed");
}
```

Ingen setup. Ingen tear down. Ingen mock.

---

## 3. Komponerbar

```javascript
add(add(2, 3), 4)         // → 9
[1, 2, 3].map(x => add(x, 10))  // → [11, 12, 13]
```

Små brikker → større logikk. Uten overraskelser.

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
