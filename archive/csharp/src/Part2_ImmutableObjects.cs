static class Part2_ImmutableObjects
{
    public static void Run()
    {
        Console.WriteLine("╔═══════════════════════════════════════════╗");
        Console.WriteLine("║  PART 2: Immutability — objekter        ║");
        Console.WriteLine("╚═══════════════════════════════════════════╝\n");

        // --- 2A: Mutable class — aliasing-buggen ---
        var alice = new MutablePerson { Name = "Alice", Age = 30 };
        var alias = alice;

        alias.Age = 35;

        Console.WriteLine("2A — Mutable class (aliasing problem):");
        Console.WriteLine($"  alice.Age = {alice.Age}  (forventet 30, ble 35!)");
        Console.WriteLine("  ❌ Én forandring på 'alias' ødela 'alice'!\n");

        // --- 2B: Immutable record — kopier i stedet ---
        var bob = new ImmutablePerson("Bob", 25);
        var bobOlder = bob with { Age = 30 };

        Console.WriteLine("2B — Immutable record (copy-on-write):");
        Console.WriteLine($"  bob.Age       = {bob.Age}       (uendret)");
        Console.WriteLine($"  bobOlder.Age  = {bobOlder.Age}  (ny versjon)");
        Console.WriteLine("  ✅ Originalen er fortsatt intakt\n");

        // --- 2C: Hvorfor dette er viktig i praksis ---
        Console.WriteLine("2C — Hjelpefunksjon med immutable data:");

        string DescribePerson(ImmutablePerson p)
            => $"{p.Name} er {p.Age} år gammel";

        string CelebrateBirthday(ImmutablePerson p)
        {
            var older = p with { Age = p.Age + 1 };
            return $"Gratulerer {older.Name}, du er nå {older.Age}!";
        }

        Console.WriteLine($"  {DescribePerson(bob)}");
        Console.WriteLine($"  {CelebrateBirthday(bob)}");
        Console.WriteLine($"  {DescribePerson(bob)}  (Bob er fortsatt 25!)");

        Console.WriteLine();
        Console.WriteLine("  💡 Ingen aliasing-bugs, time travel debugging,");
        Console.WriteLine("     trådsikkerhet — del data uten locks.");
    }
}
