---
options:
  end_slide_shorthand: true
---

# Del 3 — Immutability med lister

---

## 3A: `List<T>` — muterer originalen

```csharp
var mutableItems = new List<string> { "eple", "banan" };
mutableItems.Add("appelsin");
```

**❌** `Add` endrer lista på plass. Alle med en referanse ser endringen.

Uforutsigbart når flere deler koden.

---

## 3B: LINQ og `Append` — lager nye lister

```csharp
var originalFruits = new[] { "eple", "banan" };

var withOrange = originalFruits.Append("appelsin").ToList();
var upperFruits = originalFruits.Select(f => f.ToUpper()).ToList();
```

```csharp
originalFruits: ["eple", "banan"]       — urørt
withOrange:     ["eple", "banan", "appelsin"]
upperFruits:    ["EPLE", "BANAN"]
```

**✅** Originalen er alltid intakt.

---

## 3C: `ImmutableList` — garantert uforanderlig

```csharp
using System.Collections.Immutable;

var immFruits = originalFruits.ToImmutableList();
var withGrape = immFruits.Add("drue");
// immFruits: ["eple", "banan"] — uendret
```

Prøv `immFruits.Add("drue")` uten å lagre resultatet — det kompilerer,
men gjør ingenting. Typen *signaliserer* intensjonen.

---

## 3D: `ImmutableArray` — enda lettere

```csharp
var arr = ImmutableArray.Create(10, 20, 30);
var arr2 = arr.Add(40);
var arr3 = arr.SetItem(0, 99);
```

```csharp
arr:  [10, 20, 30]     — uendret
arr2: [10, 20, 30, 40] — ny
arr3: [99, 20, 30]     — ny
```

Samme mønster, men `ImmutableArray` er en **struct** — ingen heap-allokering.

---

## Fordeler med immutable lister

| Egenskap | Betydning |
|:---|---|
| **Prediktiv dataflyt** | Ingen overraskende mutasjoner |
| **Enkelt å reversere** | Behold forrige tilstand, sammenlign, gå tilbake |
| **Kontrakten er synlig** | `ImmutableList` sier "dette endres ikke" |
| **Ytelse** | `ImmutableArray` — struct, stack-allokert |

> LINQ (`Select`, `Where`, `Append`) + `System.Collections.Immutable`
> gir deg immutable lister uten ekstra rammeverk.
