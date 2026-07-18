export type AgentStatus =
  | "pending"
  | "running"
  | "completed";

export interface TimelineStep {
  agent: string;
  status: AgentStatus;
  message: string;
}
