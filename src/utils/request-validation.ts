import { AnalyzeRequest, EventType } from "../types/event";

const supportedEventTypes: readonly EventType[] = [
  "supplier_failure",
  "warehouse_fire",
  "demand_spike",
];

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

export const parseAnalyzeRequest = (body: unknown): AnalyzeRequest | null => {
  if (!isRecord(body)) {
    return null;
  }

  const { type, node } = body;

  if (typeof type !== "string" || typeof node !== "string") {
    return null;
  }

  if (!supportedEventTypes.includes(type as EventType)) {
    return null;
  }

  const trimmedNode = node.trim();

  if (trimmedNode.length === 0) {
    return null;
  }

  return {
    type: type as EventType,
    node: trimmedNode,
  };
};
