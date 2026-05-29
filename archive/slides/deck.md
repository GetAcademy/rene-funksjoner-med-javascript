---
options:
  end_slide_shorthand: true
---

# Funksjonell programmering i C#

20-minutters worklog

---

## Navigasjon i presenterm

| Tast | Handling |
|:---|---|
| `→` / `↓` / `j` / mellomrom | Neste slide |
| `←` / `↑` / `k` | Forrige slide |
| `g` | Første slide |
| `G` | Siste slide |
| `1`..`9` | Hopp til slide-nummer |
| `q` / `Esc` | Avslutt |

---

## Mål

Forstå rene funksjoner, sideeffekter, immutability — og hvorfor
funksjonell tenkning gjør koden lettere å teste, resonnere om og dele.

Alt du trenger er terminalen og `dotnet`.

---

## Setup

```bash
cd ~/Projects/GET/csharp-fp-worklog
dotnet run
```

Velg en del fra menyen. Les output og forstå *hvorfor* den ser ut som den gjør.

Åpne gjerne `src/`-filene side om side.

---

## Disposisjon

| Del | Tema | Tid |
|:---|:---|:---:|
| 1 | Rene funksjoner vs sideeffekter | 5 min |
| 2 | Immutability med objekter | 5 min |
| 3 | Immutability med lister | 5 min |
| 4 | Refaktorering: imperativ → funksjonell | 3 min |
| | Oppsummering | 1 min |

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
# Del 2 — Immutability med objekter

---

## 2A: Mutable class — aliasing-problemet

```csharp
class MutablePerson
{
    public string Name { get; set; }
    public int Age { get; set; }
}
```

To variabler kan peke på **samme objekt** — en forandring rammer begge.

---

## 2A: Mutable class — kode

```csharp
var alice = new MutablePerson { Name = "Alice", Age = 30 };
var alias = alice;

alias.Age = 35;
```

---

## 2A: Mutable class — output

```csharp
Console.WriteLine(alice.Age);  // 35 — ikke 30!
```

Én forandring på `alias` spredde seg til `alice`.

**❌** I en større kodebase er dette umulig å debugge systematisk.

---

## 2B: Immutable record — copy-on-write

```csharp
record ImmutablePerson(string Name, int Age);

var bob = new ImmutablePerson("Bob", 25);
var bobOlder = bob with { Age = 30 };
```

```csharp
bob.Age;       // 25 — uendret
bobOlder.Age;  // 30 — ny versjon
```

**✅** Du kan ikke endre en `record` — du må lage en *ny* med `with`.

---

## 2C: Hjelpefunksjoner med immutable data

```csharp
string CelebrateBirthday(ImmutablePerson p)
{
    var older = p with { Age = p.Age + 1 };
    return $"Gratulerer {older.Name}, du er nå {older.Age}!";
}

Console.WriteLine(CelebrateBirthday(bob));  // Bob er 26 🎂
Console.WriteLine(bob.Age);                 // Bob er fortsatt 25!
```

Ingen mutasjon. Du kan kalle den 1000 ganger — `bob` blir aldri eldre.

---

## Fordeler med immutable objekter

| Egenskap | Betydning |
|:---|---|
| **Ingen aliasing-bugs** | Del objekter fritt — ingen endrer dem bak ryggen din |
| **Time travel debugging** | Behold gamle versjoner, sammenlign, angre |
| **Trådsikkerhet** | Immutable data kan deles på tvers av tråder uten locks |
| **Kontrakt i typen** | `record` sier "dette endres ikke" |

> `record` + `with` — C#s beste verktøy for immutable objekter.
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
# Oppsummering

---

## Imperativ vs Funksjonell

| Imperativ / muterende | Funksjonell / immutable |
|:---|---:|
| Muterer input | Lager nye data |
| Skjult tilstand | Eksplisitte parametere |
| Vanskelig å teste | Triviell å teste |
| Race conditions | Trådsikker |
| Aliasing-bugs | Trygg deling |

---

## Nøkkelverktøy i C#

- **`record` + `with`** — immutable objekter
- **LINQ** (`Select`, `Where`, `Append`, `ToImmutableList()`) — immutable lister
- **`System.Collections.Immutable`** — `ImmutableArray`, `ImmutableDictionary` ...
- **Skill ren kjerne fra effekt** — returnér data, la kalleren bestemme output

---

## Bonus: prøv selv

Åpne `src/`-filene og prøv å:

1. Skriv en ren funksjon `PureMultiply(int a, int b)` som returnerer `a * b`
2. Lag et record `Product(string Name, double Price)` — lag en kopi med ny pris
3. Bruk `Select` til å konvertere `List<int>` til `List<string>` med `"tallet er {x}"`
4. Refakturer `ImperativeProcess` til å bruke `Select` med en lokal funksjon

---

## Takk for i dag!

Spørsmål?
