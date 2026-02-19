import type { TableDto } from "../types/table";

interface Props {
  tables: TableDto[];
}

export function TableList({ tables }: Props) {
  if (tables.length === 0) {
    return <div className="text-gray-500 text-sm">No tables created yet.</div>;
  }

  return (
    <div className="space-y-3">
      {tables.map((table) => (
        <div
          key={table.id}
          className="border rounded-lg p-4 flex justify-between items-center bg-white shadow-sm"
        >
          <div>
            <div className="font-medium">{table.name}</div>
            <div className="text-sm text-gray-500">Status: {table.status}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
