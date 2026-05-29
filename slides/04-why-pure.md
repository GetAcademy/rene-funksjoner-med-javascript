---
options:
  end_slide_shorthand: true
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
