export function run() {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║  Del 4: Kopier data — ikke muter         ║");
  console.log("╚══════════════════════════════════════════╝\n");

  // --- Arrays: spread ---
  console.log("4A — Spread for arrays:");
  const arr = [1, 2, 3];
  const with4 = [...arr, 4];
  const withoutFirst = arr.slice(1);

  console.log(`  arr:                [${arr}]`);
  console.log(`  with4:              [${with4}]`);
  console.log(`  withoutFirst:       [${withoutFirst}]`);
  console.log("  ✅ arr er fortsatt [1, 2, 3]\n");

  // --- Objekter: spread ---
  console.log("4B — Spread for objekter:");
  const user = { name: "Alice", age: 30 };
  const updated = { ...user, age: 31 };

  console.log(`  user:    ${JSON.stringify(user)}`);
  console.log(`  updated: ${JSON.stringify(updated)}`);
  console.log("  ✅ user er fortsatt { name: 'Alice', age: 30 }\n");

  // --- Map / Filter ---
  console.log("4C — Map / Filter (uten mutasjon):");
  const numbers = [1, 2, 3, 4, 5];

  const doubled = numbers.map((n) => n * 2);
  const even = numbers.filter((n) => n % 2 === 0);

  console.log(`  numbers: [${numbers}]`);
  console.log(`  doubled: [${doubled}]`);
  console.log(`  even:    [${even}]`);
  console.log("  ✅ numbers er fortsatt [1, 2, 3, 4, 5]\n");

  // --- Praktisk eksempel ---
  console.log("4D — Oppdater ett element i en liste:");
  const users = [
    { id: 1, name: "Alice", age: 30 },
    { id: 2, name: "Bob", age: 25 },
    { id: 3, name: "Charlie", age: 35 },
  ];

  const updatedUsers = users.map((u) => (u.id === 2 ? { ...u, age: 26 } : u));

  console.log(`  original: ${JSON.stringify(users)}`);
  console.log(`  oppdatert: ${JSON.stringify(updatedUsers)}`);
  console.log("  ✅ Kun Bob ble endret, resten er uberørt\n");
}
