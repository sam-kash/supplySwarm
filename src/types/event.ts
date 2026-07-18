export type EventType =
  | "supplier_failure"
  | "warehouse_fire"
  | "demand_spike";

export interface SupplyChainEvent {
  type: EventType;
  node: string;
}

export interface AnalyzeRequest extends SupplyChainEvent {}
