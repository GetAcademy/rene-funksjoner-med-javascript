while (true)
{
    Console.Clear();
    Console.WriteLine("╔══════════════════════════════════════════════╗");
    Console.WriteLine("║  Funksjonell programmering i C#             ║");
    Console.WriteLine("║  20-minutters worklog                        ║");
    Console.WriteLine("╚══════════════════════════════════════════════╝");
    Console.WriteLine();
    Console.WriteLine("  0  — Alle deler");
    Console.WriteLine("  1  — Rene funksjoner vs sideeffekter");
    Console.WriteLine("  2  — Immutability med objekter");
    Console.WriteLine("  3  — Immutability med lister");
    Console.WriteLine("  4  — Refaktorering: imperativ → FP");
    Console.WriteLine("  q  — Avslutt");
    Console.Write("\n  Velg: ");

    var key = Console.ReadKey(true).KeyChar;
    if (key == 'q') break;

    Console.Clear();

    switch (key)
    {
        case '0':
            Part1_PureFunctions.Run();
            Part2_ImmutableObjects.Run();
            Part3_ImmutableLists.Run();
            Part4_Refactoring.Run();
            break;
        case '1': Part1_PureFunctions.Run(); break;
        case '2': Part2_ImmutableObjects.Run(); break;
        case '3': Part3_ImmutableLists.Run(); break;
        case '4': Part4_Refactoring.Run(); break;
    }

    Console.WriteLine("\n  --- Trykk en tast for å gå tilbake til menyen ---");
    Console.ReadKey(true);
}
