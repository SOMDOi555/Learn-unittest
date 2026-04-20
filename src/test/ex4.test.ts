import { calculateBalance } from "../ex4";

interface Transaction {
  type: "deposit" | "withdraw";
  amount: number;
}

describe("ex4", () => {
  // case 1
  test("normal deposit", () => {
    const Wallet: Transaction = {
      type: "deposit",
      amount: 200,
    };
    expect(calculateBalance([Wallet])).toBe(200);
  });

  //case 2
  test("normal withdraw", () => {
    const Wallet: Transaction = {
      type: "withdraw",
      amount: 100,
    };
    expect(calculateBalance([Wallet])).toBe(-100);
  });

  //case 3
  test("Many transaction", () => {
    const Wallet: Transaction[] = [
      {
        type: "deposit",
        amount: 300,
      },
      {
        type: "withdraw",
        amount: 50,
      },
    ];
    expect(calculateBalance(Wallet)).toBe(250);
  });

  //case 4
  test("Negative deposit", () => {
    const Wallet: Transaction = {
      type: "deposit",
      amount: -100,
    };
    expect(() => calculateBalance([Wallet])).toThrow("Invalid amount");
  });

  //case 5
  test("Negative balance", () => {
    const Wallet: Transaction[] = [
      {
        type: "deposit",
        amount: 200,
      },
      {
        type: "withdraw",
        amount: 300,
      },
    ];
    expect(calculateBalance(Wallet)).toBe(-100)
  });
});
