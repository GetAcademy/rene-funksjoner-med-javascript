---
options:
  end_slide_shorthand: true
---

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
