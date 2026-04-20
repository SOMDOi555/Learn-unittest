type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

export function calculateTotal(items: CartItem[], discount: number): number {
  const total = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  if (discount < 0 || discount > 1) {
    throw new Error('Invalid discount');
  }

  return total - total * discount;
}