static class Part1_PureFunctions
{
    public static void Run()
    {
        Console.WriteLine("╔═══════════════════════════════════════════╗");
        Console.WriteLine("║  PART 1: Rene funksjoner vs sideeffekter ║");
        Console.WriteLine("╚═══════════════════════════════════════════╝\n");

        // --- 1A: Uren funksjon (side effects + mutasjon) ---
        int total = 0;

        int ImpureAdd(int a, int b)
        {
            total = a + b;
            Console.WriteLine($"  [side effect] ImpureAdd({a}, {b}) = {total}");
            return total;
        }

        Console.WriteLine("1A — Uren funksjon:");
        Console.WriteLine($"  Første kall:  {ImpureAdd(3, 4)}");
        Console.WriteLine($"  Andre kall:   {ImpureAdd(3, 4)}");
        Console.WriteLine($"  total-variabelen er nå: {total}");
        Console.WriteLine("  ❌ Samme input (3,4) gir samme output,");
        Console.WriteLine("     men total ble mutert — skjult tilstand!\n");

        // --- 1B: Ren funksjon (ingen side effects) ---
        int PureAdd(int a, int b) => a + b;

        Console.WriteLine("1B — Ren funksjon:");
        Console.WriteLine($"  PureAdd(3, 4) = {PureAdd(3, 4)}");
        Console.WriteLine($"  PureAdd(3, 4) = {PureAdd(3, 4)}");
        Console.WriteLine($"  PureAdd(3, 4) = {PureAdd(3, 4)}");
        Console.WriteLine("  ✅ Samme input → alltid samme output");
        Console.WriteLine("  ✅ Ingen ytre tilstand endret\n");

        // --- 1C: Ren funksjon — skill beregning fra effekt ---
        (int sum, string description) PureAddWithMeta(int a, int b)
            => (a + b, $"{a} + {b} = {a + b}");

        Console.WriteLine("1C — Skill beregning fra effekt:");
        var (sum, desc) = PureAddWithMeta(5, 7);
        Console.WriteLine($"  Resultat: {sum}");
        Console.WriteLine($"  Effekt (valgfri): Console.WriteLine(\"{desc}\")");

        Console.WriteLine();
        Console.WriteLine("  💡 Rene funksjoner: trivielle å teste,");
        Console.WriteLine("     forutsigbare, kan kjøres parallelt.");
    }
}
