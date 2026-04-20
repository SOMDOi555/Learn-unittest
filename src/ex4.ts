type Transaction = {
  type: 'deposit' | 'withdraw';
  amount: number;
};

export function calculateBalance(transactions: Transaction[]): number {
  return transactions.reduce((balance, t) => {
    if (t.amount <= 0) throw new Error('Invalid amount');

    if (t.type === 'deposit') return balance + t.amount;
    if (t.type === 'withdraw') return balance - t.amount;

    return balance;
  }, 0);
}