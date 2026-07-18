import { recommendRecoveryActions } from "../services/recommendation.service";
import {
  AlternativeSupplier,
  ImpactedComponentWithInventory,
  RecoveryRecommendation,
  RiskSummary,
} from "../types/domain.types";

interface DecisionAgentInput {
  alternatives: readonly AlternativeSupplier[];
  impactedComponents: readonly ImpactedComponentWithInventory[];
  risk: RiskSummary;
}

export const decisionAgent = async ({
  alternatives,
  impactedComponents,
  risk,
}: DecisionAgentInput): Promise<RecoveryRecommendation> => {
  return recommendRecoveryActions(impactedComponents, alternatives, risk);
};
