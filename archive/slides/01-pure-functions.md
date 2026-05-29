---
options:
  end_slide_shorthand: true
---

# Del 1 — Rene funksjoner vs sideeffekter

---

## 1A: Uren funksjon — problemet

Gjør **to** ting samtidig:

1. **Muterer** `total` — en variabel *utenfor* funksjonen
2. **Skriver til konsollen** — en sideeffekt

Dette kalles *skjult tilstand* — andre funksjoner som bruker `total` får feil verdi.

---

## 1A: Uren funksjon — kode

```csharp
int total = 0;

int ImpureAdd(int a, int b)
{
    total = a + b;
    Console.WriteLine($"ImpureAdd({a}, {b}) = {total}");
    return total;
}
```

---

## 1A: Uren funksjon — output

```csharp
ImpureAdd(3, 4);  // 7, total=7
ImpureAdd(3, 4);  // 7, total=7
```

Samme input (3,4) gir samme output, **men `total` ble mutert**.

Hvis en annen funksjon leser `total`, får den 7 — ikke 0 som forventet.

**❌** Uforutsigbar. Umulig å debugge systematisk i en stor kodebase.

---

## 1B: Ren funksjon — konsept

Gjør **én** ting: regner ut summen.

- Ingen mutasjon
- Ingen output
- Samme input → **alltid** samme output

---

## 1B: Ren funksjon — kode

```csharp
int PureAdd(int a, int b) => a + b;
```

```csharp
PureAdd(3, 4);  // 7
PureAdd(3, 4);  // 7
PureAdd(3, 4);  // 7
```

**✅** Forutsigbar. Kan kalles 100 ganger — null overraskelser.

---

## 1C: Skill beregning fra effekt — konsept

La funksjonen returnere data — la **kalleren** bestemme output.

Kjernen forblir ren. Effekten isoleres til kalleren.

---

## 1C: Skill beregning fra effekt — kode

```csharp
(int sum, string description) PureAddWithMeta(int a, int b)
    => (a + b, $"{a} + {b} = {a + b}");

var (sum, desc) = PureAddWithMeta(5, 7);
// sum = 12
// desc = "5 + 7 = 12"
```

Kalleren velger om/hvordan `desc` skal vises.

**✅** Kjernen er ren — testbar, forutsigbar, komponerbar.

---

## Fordeler med rene funksjoner

| Egenskap | Betydning |
|:---|---|
| **Trivielle å teste** | Ingen setup, ingen mock |
| **Forutsigbare** | Trenger ikke forstå hele programmet |
| **Parallelliserbare** | Ingen race conditions |
| **Komponerbare** | Bygg større logikk fra små, rene brikker |

> Rene funksjoner er *gratis* å forstå — du trenger bare å se på parameterne.
