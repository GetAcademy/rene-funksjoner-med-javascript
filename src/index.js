import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function menu() {
  while (true) {
    console.clear();
    console.log("╔══════════════════════════════════════════╗");
    console.log("║  Rene funksjoner — Worklog               ║");
    console.log("╚══════════════════════════════════════════╝\n");
    console.log("  0  — Alle deler");
    console.log("  1  — Uren processOrder (test-problemet)");
    console.log("  2  — Sideeffekt Type 1: IO");
    console.log("  3  — Sideeffekt Type 2: Mutasjon");
    console.log("  4  — Kopier data (nye arrays/objekter)");
    console.log("  5  — Hvorfor rene funksjoner");
    console.log("  6  — Refaktorert: ren processOrder + test");
    console.log("  q  — Avslutt");
    console.log();

    const key = await ask("  Velg: ");
    if (key.toLowerCase() === "q") break;

    console.clear();

    switch (key) {
      case "0": {
        const { run: run01 } = await import("./01-impure-order.js");
        const { run: run02 } = await import("./02-side-effect-io.js");
        const { run: run03 } = await import("./03-side-effect-mutation.js");
        const { run: run04 } = await import("./04-copy-data.js");
        const { run: run05 } = await import("./05-why-pure.js");
        const { run: run06 } = await import("./06-pure-order.js");
        run01();
        run02();
        run03();
        run04();
        run05();
        run06();
        break;
      }
      case "1": {
        const { run } = await import("./01-impure-order.js");
        run();
        break;
      }
      case "2": {
        const { run } = await import("./02-side-effect-io.js");
        run();
        break;
      }
      case "3": {
        const { run } = await import("./03-side-effect-mutation.js");
        run();
        break;
      }
      case "4": {
        const { run } = await import("./04-copy-data.js");
        run();
        break;
      }
      case "5": {
        const { run } = await import("./05-why-pure.js");
        run();
        break;
      }
      case "6": {
        const { run } = await import("./06-pure-order.js");
        run();
        break;
      }
    }

    console.log("\n  --- Trykk Enter for å gå tilbake ---");
    await ask("");
  }

  rl.close();
}

menu();
