static class Part4_Refactoring
{
    public static void Run()
    {
        Console.WriteLine("╔═══════════════════════════════════════════╗");
        Console.WriteLine("║  PART 4: Refaktorering — imperativ → FP  ║");
        Console.WriteLine("╚═══════════════════════════════════════════╝\n");

        // --- 4A: Imperativ (muterende) variant ---
        List<int> ImperativeProcess(List<int> items)
        {
            for (int i = 0; i < items.Count; i++)
            {
                if (items[i] < 0)
                    items[i] = 0;
                else
                    items[i] = items[i] * 2;
            }
            return items;
        }

        var input1 = new List<int> { -3, 0, 5, -1, 8 };
        var result1 = ImperativeProcess(input1);

        Console.WriteLine("4A — Imperativ (muterer input):");
        Console.WriteLine($"  input:   {string.Join(", ", input1)}");
        Console.WriteLine($"  output:  {string.Join(", ", result1)}");
        Console.WriteLine("  ❌ input og output er SAMME objekt — originalen er ødelagt!\n");

        // --- 4B: Funksjonell variant ---
        int ClampAndDouble(int x) => x < 0 ? 0 : x * 2;

        var input2 = new List<int> { -3, 0, 5, -1, 8 };
        var result2 = input2.Select(ClampAndDouble).ToList();

        Console.WriteLine("4B — Funksjonell (kopierer):");
        Console.WriteLine($"  input:   {string.Join(", ", input2)}");
        Console.WriteLine($"  output:  {string.Join(", ", result2)}");
        Console.WriteLine("  ✅ input er fortsatt intakt");
        Console.WriteLine("  ✅ ClampAndDouble er testbar isolert");
        Console.WriteLine("  ✅ Lett å komponere videre (Select, Where, ...)");

        Console.WriteLine();
        Console.WriteLine("  💡 Komponerbar, testbar isolert, ingen bivirkninger.");
    }
}
