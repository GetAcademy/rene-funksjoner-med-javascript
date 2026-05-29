export function run() {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║  Del 1: Uren processOrder               ║");
  console.log("╚══════════════════════════════════════════╝\n");

  // --- Uren processOrder ---
  let taxRate = 0.25;

  function processOrder(order) {
    taxRate = 0.20;
    console.log("  Processing order...");
    for (let i = 0; i < order.items.length; i++) {
      order.items[i].price *= 1 + taxRate;
    }
    return order;
  }

  const order = {
    items: [
      { name: "T-skjorte", price: 100, qty: 2 },
      { name: "Bukse", price: 200, qty: 1 },
    ],
  };

  console.log("1A — Før kallet:");
  console.log(`  order.items[0].price = ${order.items[0].price}`);
  console.log(`  order.items[1].price = ${order.items[1].price}`);
  console.log(`  taxRate = ${taxRate}\n`);

  const result = processOrder(order);

  console.log("1B — Etter kallet:");
  console.log(`  result.items[0].price = ${result.items[0].price}`);
  console.log(`  result.items[1].price = ${result.items[1].price}`);
  console.log(`  taxRate = ${taxRate}`);
  console.log("  ❌ order.items ble mutert — originaldata er ødelagt!");
  console.log("  ❌ global taxRate ble endret!\n");

  // --- Hvorfor er dette vanskelig å teste? ---
  console.log("1C — Test-problem:");
  console.log("  For å teste processOrder må vi:");
  console.log("    1. Mocke console.log");
  console.log("    2. Nulstille global taxRate før hver test");
  console.log("    3. Lage en ny order for hver test (blir mutert)");
  console.log("  ❌ Skjør test som brekker når noe annet endres\n");
}
