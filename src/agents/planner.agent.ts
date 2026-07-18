export type PlannedAgent = "supplier" | "dependency" | "risk" | "decision";

export const plannerAgent = async (): Promise<PlannedAgent[]> => {
  return ["supplier", "dependency", "risk", "decision"];
};
