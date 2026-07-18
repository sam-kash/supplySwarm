import { dependencyAgent } from "./dependency.agent";
import { decisionAgent } from "./decision.agent";
import { riskAgent } from "./risk.agent";
import { supplierAgent } from "./supplier.agent";
import { loadSupplyChainDataset } from "../services/supply-chain-data.service";
import { AnalyzeRequest } from "../types/event";
import { AnalysisResponse, ImpactAnalysis } from "../types/response.types";
import { TimelineStep } from "../types/timeline";
import { AppError } from "../utils/errors";

const unique = (values: readonly string[]): string[] => {
  return [...new Set(values)];
};

export const analyzeDisruption = async (
  event: AnalyzeRequest
): Promise<AnalysisResponse> => {
  if (event.type !== "supplier_failure") {
    throw new AppError(
      400,
      "UNSUPPORTED_EVENT",
      `Event type ${event.type} is recognized but is not implemented yet.`
    );
  }

  const dataset = await loadSupplyChainDataset();
  const supplier = await supplierAgent({
    suppliers: dataset.suppliers,
    supplierName: event.node,
  });

  if (!supplier) {
    throw new AppError(
      404,
      "NOT_FOUND",
      `Supplier ${event.node} was not found in the supply chain dataset.`
    );
  }

  const impactedComponents = await dependencyAgent({
    dependencies: dataset.dependencies,
    inventory: dataset.inventory,
    supplierName: supplier.name,
  });
  const risk = await riskAgent({ impactedComponents });
  const recommendation = await decisionAgent({
    alternatives: dataset.alternatives,
    impactedComponents,
    risk,
  });

  const affectedProducts = unique(
    impactedComponents.flatMap((component) => component.affectedProducts)
  );

  const impact: ImpactAnalysis = {
    disruptedNode: supplier.name,
    affectedComponents: impactedComponents,
    affectedProducts,
    estimatedDelayDays: risk.estimatedDelayDays,
    riskLevel: risk.level,
  };

  const timeline: TimelineStep[] = [
    {
      agent: "supplier",
      status: "completed",
      message: `Resolved disrupted node ${supplier.name}.`,
    },
    {
      agent: "dependency",
      status: "completed",
      message: `Mapped ${impactedComponents.length} impacted component path(s).`,
    },
    {
      agent: "risk",
      status: "completed",
      message: `Calculated ${risk.level} risk with ${risk.estimatedDelayDays} estimated delay day(s).`,
    },
    {
      agent: "decision",
      status: "completed",
      message: "Selected recovery recommendation from available alternatives.",
    },
  ];

  return {
    success: true,
    event,
    timeline,
    impact,
    recommendation,
  };
};
