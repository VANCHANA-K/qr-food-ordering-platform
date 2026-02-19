import type { TableDto } from "../types/table";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5132";

export async function getTables(): Promise<TableDto[]> {
  const res = await fetch(`${BASE_URL}/tables`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch tables (${res.status})`);
  }

  return res.json();
}
