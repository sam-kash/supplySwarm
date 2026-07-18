import {
  AlternativeSupplier,
  ImpactedComponentWithInventory,
  RecoveryOption,
  RecoveryRecommendation,
  RiskSummary,
} from "../types/domain.types";

const findRecoveryOptions = (
  impactedComponents: readonly ImpactedComponentWithInventory[],
  alternatives: readonly AlternativeSupplier[]
): RecoveryOption[] => {
  return impactedComponents.flatMap((impactedComponent) => {
    return alternatives
      .filter(
        (alternative) =>
          alternative.component.toLowerCase() ===
          impactedComponent.component.toLowerCase()
      )
      .map((alternative) => ({
        component: alternative.component,
        supplier: alternative.supplier,
        extraCost: alternative.extraCost,
        confidence: alternative.confidence,
      }));
  });
};

const buildImmediateActions = (
  impactedComponents: readonly ImpactedComponentWithInventory[],
  recoveryOptions: readonly RecoveryOption[]
): string[] => {
  const lowStockComponents = impactedComponents
    .filter((component) => component.stockDays <= 3)
    .map((component) => component.component);

  const actions = [
    "Notify demand planning and customer operations about exposed products.",
    "Freeze non-essential consumption of constrained components.",
  ];

  if (lowStockComponents.length > 0) {
    actions.unshift(
      `Expedite sourcing for ${lowStockComponents.join(", ")} within 24 hours.`
    );
  }

  if (recoveryOptions.length === 0) {
    actions.push("Open manual supplier search for components without alternates.");
  }

  return actions;
};

export const recommendRecoveryActions = (
  impactedComponents: readonly ImpactedComponentWithInventory[],
  alternatives: readonly AlternativeSupplier[],
  risk: RiskSummary
): RecoveryRecommendation => {
  const recoveryOptions = findRecoveryOptions(impactedComponents, alternatives);
  const preferredOption = recoveryOptions[0];

  return {
    action: preferredOption
      ? `Switch ${preferredOption.component} supply to ${preferredOption.supplier}.`
      : "Escalate to procurement for manual recovery planning.",
    reason:
      recoveryOptions.length > 0
        ? `Risk is ${risk.level}; ${recoveryOptions.length} qualified alternate supplier option(s) are available.`
        : `Risk is ${risk.level}; no qualified alternate supplier is available in the current dataset.`,
    options: recoveryOptions,
    immediateActions: buildImmediateActions(impactedComponents, recoveryOptions),
  };
};
