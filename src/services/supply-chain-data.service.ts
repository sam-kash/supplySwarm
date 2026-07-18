import { loadJsonFile } from "../utils/json-loader";
import {
  AlternativeSupplier,
  Dependency,
  InventoryItem,
  Product,
  Supplier,
  SupplyChainDataset,
} from "../types/domain.types";

export const loadSupplyChainDataset = async (): Promise<SupplyChainDataset> => {
  const [suppliers, products, dependencies, inventory, alternatives] =
    await Promise.all([
      loadJsonFile<Supplier[]>("suppliers.json"),
      loadJsonFile<Product[]>("products.json"),
      loadJsonFile<Dependency[]>("dependencies.json"),
      loadJsonFile<InventoryItem[]>("inventory.json"),
      loadJsonFile<AlternativeSupplier[]>("alternatives.json"),
    ]);

  return {
    suppliers,
    products,
    dependencies,
    inventory,
    alternatives,
  };
};
