---
options:
  end_slide_shorthand: true
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
