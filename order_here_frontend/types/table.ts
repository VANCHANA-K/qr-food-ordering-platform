export type TableStatus = "Available" | "Occupied" | "Closed";

export interface TableDto {
  id: string;
  name: string;
  status: TableStatus;
}
