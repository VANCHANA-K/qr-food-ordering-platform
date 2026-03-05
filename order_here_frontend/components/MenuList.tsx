import type { MenuItemDto } from "@/types/menu";

type Props = {
  items: MenuItemDto[];
};

export function MenuList({ items }: Props) {
  if (items.length === 0) {
    return <div className="text-sm text-gray-500">No menu items available.</div>;
  }

  return (
    <div className="space-y-3">
      {items.map((x) => {
        const disabled = !x.isAvailable;

        return (
          <div
            key={x.id}
            className={`rounded-xl border p-4 flex items-center justify-between ${
              disabled ? "opacity-60" : "bg-white"
            }`}
          >
            <div>
              <div className="font-semibold text-base">{x.name}</div>
              <div className="text-xs text-gray-500">{x.code}</div>
            </div>

            <div className="flex items-center gap-3">
              <div className="font-bold">{x.price}฿</div>

              <button
                disabled={disabled}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  disabled
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white"
                }`}
              >
                {disabled ? "Unavailable" : "Add"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
