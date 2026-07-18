import { findImpactedComponentsBySupplier } from "../services/graph.service";
import { attachInventoryToImpacts } from "../services/inventory.service";
import {
  Dependency,
  ImpactedComponentWithInventory,
  InventoryItem,
} from "../types/domain.types";

interface DependencyAgentInput {
  dependencies: readonly Dependency[];
  inventory: readonly InventoryItem[];
  supplierName: string;
}

export const dependencyAgent = async ({
  dependencies,
  inventory,
  supplierName,
}: DependencyAgentInput): Promise<ImpactedComponentWithInventory[]> => {
  const impactedComponents = findImpactedComponentsBySupplier(
    dependencies,
    supplierName
  );

  return attachInventoryToImpacts(impactedComponents, inventory);
};
