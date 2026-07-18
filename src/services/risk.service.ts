import {
  ImpactedComponentWithInventory,
  RiskLevel,
  RiskSummary,
} from "../types/domain.types";

const getRiskLevel = (
  impactedComponents: readonly ImpactedComponentWithInventory[]
): RiskLevel => {
  if (impactedComponents.some((component) => component.stockDays <= 2)) {
    return "critical";
  }

  if (impactedComponents.some((component) => component.stockDays <= 5)) {
    return "high";
  }

  if (impactedComponents.length > 0) {
    return "medium";
  }

  return "low";
};

const estimateDelayDays = (
  impactedComponents: readonly ImpactedComponentWithInventory[]
): number => {
  if (impactedComponents.length === 0) {
    return 0;
  }

  const lowestStockDays = Math.min(
    ...impactedComponents.map((component) => component.stockDays)
  );

  return Math.max(1, 7 - lowestStockDays);
};

export const assessSupplyRisk = (
  impactedComponents: readonly ImpactedComponentWithInventory[]
): RiskSummary => {
  const criticalComponents = impactedComponents
    .filter((component) => component.priority === "Critical")
    .map((component) => component.component);

  const level = getRiskLevel(impactedComponents);
  const estimatedDelayDays = estimateDelayDays(impactedComponents);

  return {
    level,
    estimatedDelayDays,
    criticalComponents,
    reason:
      impactedComponents.length === 0
        ? "No downstream product dependencies were found for the disrupted node."
        : `${impactedComponents.length} component dependency path(s) are exposed, with ${criticalComponents.length} critical component(s).`,
  };
};
