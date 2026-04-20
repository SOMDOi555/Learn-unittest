import { calculateTotal } from "../ex3";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

describe("ex3 calculateToTal", () => {
  // case 1
  test("calculate with discount", () => {
    const item: CartItem = {
      name: "Soap",
      price: 20,
      quantity: 2,
    };
    expect(calculateTotal([item], 0.1)).toBe(36);
  });

  //case 2
  test("calculate without discount", () => {
    const item: CartItem = {
      name: "Soap",
      price: 20,
      quantity: 2,
    };
    expect(() => calculateTotal([item], 2)).toThrow("Invalid discount");
  });
});
