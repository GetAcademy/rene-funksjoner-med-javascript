---
options:
  end_slide_shorthand: true
---

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
