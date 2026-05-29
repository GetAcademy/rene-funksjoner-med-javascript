export function run() {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║  Del 4: Hvorfor rene funksjoner          ║");
  console.log("╚══════════════════════════════════════════╝\n");

  function add(a, b) {
    return a + b;
  }

  // --- 4A: Forutsigbar ---
  console.log("4A — Forutsigbar:");
  console.log(`  add(2, 3) = ${add(2, 3)}`);
  console.log(`  add(2, 3) = ${add(2, 3)}`);
  console.log(`  add(2, 3) = ${add(2, 3)}`);
  console.log("  ✅ Alltid samme svar\n");

  // --- 4B: Testbar ---
  console.log("4B — Testbar (null mocking):");

  function testAdd() {
    const tests = [
      { a: 2, b: 3, expected: 5 },
      { a: -1, b: 1, expected: 0 },
      { a: 0, b: 0, expected: 0 },
      { a: 100, b: -50, expected: 50 },
    ];

    for (const { a, b, expected } of tests) {
      const result = add(a, b);
      if (result !== expected) {
        console.log(
          `  ❌ FAIL: add(${a}, ${b}) = ${result}, expected ${expected}`,
        );
        return;
      }
    }
    console.log("  ✅ testAdd passed — ingen setup, ingen mock!\n");
  }

  testAdd();

  // --- 4C: Komponerbar ---
  console.log("4C — Komponerbar:");
  console.log(`  add(add(2, 3), 4) = ${add(add(2, 3), 4)}`);
  console.log(
    `  [1,2,3].map(x => add(x, 10)) = [${[1, 2, 3].map((x) => add(x, 10))}]`,
  );
  console.log("  ✅ Små rene brikker → større logikk uten overraskelser\n");
}
