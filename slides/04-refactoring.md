---
options:
  end_slide_shorthand: true
---

# Del 4 — Refaktorering: imperativ → funksjonell

---

## 4A: Imperativ — muterer input

```csharp
List<int> ImperativeProcess(List<int> items)
{
    for (int i = 0; i < items.Count; i++)
    {
        if (items[i] < 0)
            items[i] = 0;
        else
            items[i] = items[i] * 2;
    }
    return items;  // returnerer SAMME objekt!
}
```

---

## 4A: Imperativ — output

```csharp
var input1 = new List<int> { -3, 0, 5, -1, 8 };
var result1 = ImperativeProcess(input1);

// input1 = [0, 0, 10, 0, 16] — ødelagt!
// result1 = samme objekt som input1
```

**❌** Etter kallet er `input1` ødelagt. Hvis noen trengte den originale
lista — for eksempel til å vise "før"-verdien i UI — er det for sent.

---

## 4B: Funksjonell — kopierer

```csharp
int ClampAndDouble(int x) => x < 0 ? 0 : x * 2;

var input2 = new List<int> { -3, 0, 5, -1, 8 };
var result2 = input2.Select(ClampAndDouble).ToList();
```

```csharp
input2:  [-3, 0, 5, -1, 8] — urørt
result2: [0, 0, 10, 0, 16] — ny liste
```

**✅** `ClampAndDouble` er en liten, ren funksjon. `Select` lager en ny liste.

---

## Fordeler med funksjonell refaktorering

| Egenskap | Betydning |
|:---|---|
| **Lett å komponere** | `Select`, `Where`, `Aggregate` kan kjedest |
| **Testbar isolert** | `ClampAndDouble` testes alene, uten liste-kontekst |
| **Ingen bivirkninger** | Refaktorer uten å brekke andre deler |
| **Lesbarhet** | Koden sier *hva* den gjør, ikke *hvordan* |

> Imperativ: `for (int i = 0; i < items.Count; i++) { if ... }`
> Funksjonell: `items.Select(ClampAndDouble)`

Færre muligheter for feil. Mindre støy. Samme resultat.
