---
options:
  end_slide_shorthand: true
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
