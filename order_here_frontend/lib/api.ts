import type { TableDto } from "../types/table";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5132";

// getTables - GET /tables
export async function getTables(): Promise<TableDto[]> {
  const res = await fetch(`${BASE_URL}/tables`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch tables (${res.status})`);
  }

  return res.json();
}
// createTable - POST /tables
export async function createTable(code: string) {
  const res = await fetch(`${BASE_URL}/tables`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }), // 👈 แก้ตรงนี้
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create table: ${text}`);
  }

  return res.json();
}
