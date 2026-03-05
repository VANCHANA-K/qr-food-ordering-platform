"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getTableSession } from "@/lib/session";
import { getMenuByTable } from "@/lib/api";
import type { MenuItemDto } from "@/types/menu";
import { MenuList } from "@/components/MenuList";

export default function MenuPage() {
  const router = useRouter();

  const [items, setItems] = useState<MenuItemDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const session = getTableSession();
      if (!session) {
        setLoading(false);
        router.replace("/");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await getMenuByTable(session.tableId);
        setItems(data);
      } catch {
        setError("Failed to load menu.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [router]);

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-xl font-bold">Menu</h1>
        <p className="text-sm text-gray-500">Items for your table session</p>
      </div>

      {loading && <div className="text-sm">Loading menu...</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}
      {!loading && !error && <MenuList items={items} />}
    </div>
  );
}
