import { transactions } from "@/lib/data/transactions";
import type { Transaction, TransactionStatus, TransactionType } from "@/types";

export interface TransactionFilters {
  type?: TransactionType;
  status?: TransactionStatus;
  from?: string;
  to?: string;
}

export async function getTransactions(filters: TransactionFilters = {}): Promise<Transaction[]> {
  return transactions
    .filter((t) => !filters.type || t.type === filters.type)
    .filter((t) => !filters.status || t.status === filters.status)
    .filter((t) => !filters.from || t.date.slice(0, 10) >= filters.from)
    .filter((t) => !filters.to || t.date.slice(0, 10) <= filters.to)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getTransaction(id: string): Promise<Transaction | undefined> {
  return transactions.find((t) => t.id === id);
}

export async function getRecentTransactions(limit = 3) {
  return (await getTransactions()).slice(0, limit);
}
