"use client";

import { useEffect, useState } from "react";
import { getTables } from "@/lib/api";
import { TableDto } from "@/types/table";
import { TableList } from "@/components/TableList";
import { CreateTableForm } from "@/components/CreateTableForm";

export default function StaffTablesPage() {
  const [tables, setTables] = useState<TableDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadTables() {
    try {
      setLoading(true);
      setError(null);

      const data = await getTables();
      setTables(data);
    } catch {
      setError("Failed to load tables");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTables();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Staff – Table Management</h1>

      <CreateTableForm onCreated={loadTables} />

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {!loading && !error && <TableList tables={tables} />}
    </div>
  );
}
