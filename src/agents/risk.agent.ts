import { assessSupplyRisk } from "../services/risk.service";
import {
  ImpactedComponentWithInventory,
  RiskSummary,
} from "../types/domain.types";

interface RiskAgentInput {
  impactedComponents: readonly ImpactedComponentWithInventory[];
}

export const riskAgent = async ({
  impactedComponents,
}: RiskAgentInput): Promise<RiskSummary> => {
  return assessSupplyRisk(impactedComponents);
};
