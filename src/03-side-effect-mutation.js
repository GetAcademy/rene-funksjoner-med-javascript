export function run() {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║  Del 3: Sideeffekt Type 2 — Mutasjon     ║");
  console.log("╚══════════════════════════════════════════╝\n");

  // --- 3A: Global mutasjon ---
  let counter = 0;

  function impureNextId() {
    return ++counter;
  }

  console.log("3A — Global mutasjon:");
  console.log(`  impureNextId() = ${impureNextId()}`);
  console.log(`  impureNextId() = ${impureNextId()}`);
  console.log(`  impureNextId() = ${impureNextId()}`);
  console.log("  ❌ Samme input (ingen!) → forskjellig output");
  console.log(`  counter er nå: ${counter}\n`);

  function pureNextId(counter) {
    return counter + 1;
  }

  console.log("  Ren versjon:");
  console.log(`  pureNextId(0) = ${pureNextId(0)}`);
  console.log(`  pureNextId(0) = ${pureNextId(0)}`);
  console.log(`  pureNextId(0) = ${pureNextId(0)}`);
  console.log("  ✅ Samme input → alltid samme output\n");

  // --- 3B: Referansemutasjon ---
  function impureAddVat(prices, vat) {
    for (let i = 0; i < prices.length; i++) {
      prices[i] = prices[i] * (1 + vat);
    }
    return prices;
  }

  const original1 = [100, 200, 300];
  const result1 = impureAddVat(original1, 0.25);

  console.log("3B — Referansemutasjon:");
  console.log(`  original:  [${original1}]`);
  console.log(`  result:    [${result1}]`);
  console.log(`  er samme objekt: ${original1 === result1}`);
  console.log("  ❌ originaldata er ødelagt!\n");

  function pureAddVat(prices, vat) {
    return prices.map((p) => p * (1 + vat));
  }

  const original2 = [100, 200, 300];
  const result2 = pureAddVat(original2, 0.25);

  console.log("  Ren versjon (kopierer):");
  console.log(`  original:  [${original2}]  (urørt!)`);
  console.log(`  result:    [${result2}]`);
  console.log("  ✅ Originalen er intakt\n");
}
