"use client";

import { useState } from "react";
import { createTable } from "@/lib/api";

interface Props {
  onCreated: () => void;
}

export function CreateTableForm({ onCreated }: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Table name is required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await createTable(name);

      setName("");
      onCreated(); // refresh table list
    } catch {
      setError("Failed to create table");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-4 mb-6 space-y-3"
    >
      <div className="font-semibold">Create New Table</div>

      <input
        type="text"
        placeholder="Enter table name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
