export function run() {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║  Del 2: Sideeffekt Type 1 — IO          ║");
  console.log("╚══════════════════════════════════════════╝\n");

  // --- Uren: console.log er en sideeffekt ---
  function impureGreet(name) {
    console.log(`  Hello ${name}`);
  }

  console.log("2A — Uren greet (IO er skjult):");
  console.log("  impureGreet returnerer:", impureGreet("Bob"));
  console.log("  ❌ Kan ikke fange output, kan ikke teste\n");

  // --- Ren: returnerer bare data ---
  function pureGreet(name) {
    return `Hello ${name}`;
  }

  console.log("2B — Ren greet (returnerer data):");
  console.log(`  pureGreet returnerer: "${pureGreet("Bob")}"`);
  console.log("  ✅ Forutsigbar, kan testes, kan gjenbrukes\n");

  // --- Samme ren funksjon, ulik output ---
  console.log("2C — Samme ren funksjon, ulik effekt hos kalleren:");
  const message = pureGreet("Alice");
  console.log(`  console.log: ${message}`);
  // I en nettleser: document.body.textContent = message;
  // I et API: res.json({ message });
  console.log("  ✅ Kalleren bestemmer output — funksjonen forblir ren\n");
}
