export function run() {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║  Del 5: Refaktorert — ren processOrder   ║");
  console.log("╚══════════════════════════════════════════╝\n");

  // --- REN kjerne: null IO, null mutasjon ---
  function calculateTotal(order, taxRate) {
    const subtotal = order.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0,
    );
    return subtotal * (1 + taxRate);
  }

  // --- IO hos kalleren ---
  function processOrder(order, taxRate) {
    const total = calculateTotal(order, taxRate);
    console.log(`  Total: ${total}`);
    return total;
  }

  const order = {
    items: [
      { name: "T-skjorte", price: 100, qty: 2 },
      { name: "Bukse", price: 200, qty: 1 },
    ],
  };

  console.log("5A — Ren kjerne + IO hos kalleren:");
  console.log(`  Order før: items[0].price = ${order.items[0].price}`);
  console.log(`  Order før: items[1].price = ${order.items[1].price}\n`);

  const total = processOrder(order, 0.25);

  console.log(`\n  Order etter: items[0].price = ${order.items[0].price}`);
  console.log(`  Order etter: items[1].price = ${order.items[1].price}`);
  console.log("  ✅ Order er urørt — kan gjenbrukes!\n");

  // --- Unit test uten mocking ---
  console.log("5B — Unit test (null mocking!):");

  function testCalculateTotal() {
    const testOrder = {
      items: [
        { name: "T-skjorte", price: 100, qty: 2 },
        { name: "Bukse", price: 200, qty: 1 },
      ],
    };

    // 100*2 + 200*1 = 400 + 25% mva = 500
    const result = calculateTotal(testOrder, 0.25);

    if (result !== 500) {
      console.log(`  ❌ FAIL: expected 500, got ${result}`);
      return;
    }

    console.log("  ✅ testCalculateTotal passed!");
    console.log("  ✅ Ingen console.mock, ingen global setup,");
    console.log("  ✅ Ingen order kopi — testOrder er urørt\n");
  }

  testCalculateTotal();

  // --- Sammenligning ---
  console.log("5C — Før vs. Etter:");
  console.log("  Før (uren):     processOrder(order)");
  console.log("  Etter (ren):    calculateTotal(order, taxRate)");
  console.log("  ✅ Må ikke mocke console");
  console.log("  ✅ taxRate er en parameter, ikke global");
  console.log("  ✅ order er urørt etter kallet");
  console.log("  ✅ Testen er robust og lesbar\n");
}
