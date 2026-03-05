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

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await getTables();
      setTables(data);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to load tables.";
      setError(message);
      setTables([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function initialLoad() {
      setError(null);
      try {
        const data = await getTables();
        if (!cancelled) {
          setTables(data);
        }
      } catch (e) {
        if (!cancelled) {
          const message = e instanceof Error ? e.message : "Failed to load tables.";
          setError(message);
          setTables([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    initialLoad();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Staff – Table Management</h1>

      {/* 🔵 Create Form กลับมาแล้ว */}
      <CreateTableForm onCreated={load} />

      {error && <div className="text-sm text-red-600">{error}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <TableList tables={tables} refresh={load} />
      )}
    </div>
  );
}
