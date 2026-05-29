using System.Collections.Immutable;

static class Part3_ImmutableLists
{
    public static void Run()
    {
        Console.WriteLine("╔═══════════════════════════════════════════╗");
        Console.WriteLine("║  PART 3: Immutability — lister           ║");
        Console.WriteLine("╚═══════════════════════════════════════════╝\n");

        // --- 3A: List<T> — muterer originalen ---
        var mutableItems = new List<string> { "eple", "banan" };
        mutableItems.Add("appelsin");

        Console.WriteLine("3A — List<T> (muterer):");
        Console.WriteLine($"  {string.Join(", ", mutableItems)}");
        Console.WriteLine("  ⚠️  Originalen ble endret.\n");

        // --- 3B: LINQ — lag ny liste istedenfor ---
        var originalFruits = new[] { "eple", "banan" };

        var withOrange = originalFruits.Append("appelsin").ToList();
        var upperFruits = originalFruits.Select(f => f.ToUpper()).ToList();

        Console.WriteLine("3B — LINQ / Append (kopierer):");
        Console.WriteLine($"  original:          {string.Join(", ", originalFruits)}");
        Console.WriteLine($"  med appelsin:      {string.Join(", ", withOrange)}");
        Console.WriteLine($"  upper:             {string.Join(", ", upperFruits)}");
        Console.WriteLine("  ✅ Originalen er urørt\n");

        // --- 3C: ImmutableList — garantert uforanderlig ---
        var immFruits = originalFruits.ToImmutableList();

        var withGrape = immFruits.Add("drue");

        Console.WriteLine("3C — ImmutableList (garantert uforanderlig):");
        Console.WriteLine($"  original:          {string.Join(", ", immFruits)}");
        Console.WriteLine($"  med drue:          {string.Join(", ", withGrape)}");
        Console.WriteLine("  ✅ Trygg deling — ingen kan endre den under deg\n");

        // --- 3D: ImmutableArray — enda lettere ---
        var arr = ImmutableArray.Create(10, 20, 30);
        var arr2 = arr.Add(40);
        var arr3 = arr.SetItem(0, 99);

        Console.WriteLine("3D — ImmutableArray:");
        Console.WriteLine($"  arr:   {string.Join(", ", arr)}");
        Console.WriteLine($"  + 40:  {string.Join(", ", arr2)}");
        Console.WriteLine($"  endre: {string.Join(", ", arr3)}");

        Console.WriteLine();
        Console.WriteLine("  💡 Prediktiv dataflyt, enkelt å reversere,");
        Console.WriteLine("     kontrakten er synlig i typen.");
    }
}
