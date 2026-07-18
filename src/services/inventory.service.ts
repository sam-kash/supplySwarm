import {
  ImpactedComponent,
  ImpactedComponentWithInventory,
  InventoryItem,
} from "../types/domain.types";

const defaultInventory: Pick<InventoryItem, "stockDays" | "priority"> = {
  stockDays: 0,
  priority: "Critical",
};

export const attachInventoryToImpacts = (
  impactedComponents: readonly ImpactedComponent[],
  inventory: readonly InventoryItem[]
): ImpactedComponentWithInventory[] => {
  return impactedComponents.map((impactedComponent) => {
    const inventoryItem = inventory.find(
      (item) =>
        item.component.toLowerCase() === impactedComponent.component.toLowerCase()
    );

    return {
      ...impactedComponent,
      stockDays: inventoryItem?.stockDays ?? defaultInventory.stockDays,
      priority: inventoryItem?.priority ?? defaultInventory.priority,
    };
  });
};
