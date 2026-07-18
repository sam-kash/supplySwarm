export type SupplierStatus = "active" | "inactive" | "constrained";

export type InventoryPriority = "Critical" | "Medium" | "Low";

export interface Supplier {
  id: string;
  name: string;
  country: string;
  status: SupplierStatus;
}

export interface Product {
  id: string;
  name: string;
}

export interface Dependency {
  supplier: string;
  component: string;
  products: string[];
}

export interface InventoryItem {
  component: string;
  stockDays: number;
  priority: InventoryPriority;
}

export interface AlternativeSupplier {
  component: string;
  supplier: string;
  extraCost: string;
  confidence: number;
}

export interface SupplyChainDataset {
  suppliers: Supplier[];
  products: Product[];
  dependencies: Dependency[];
  inventory: InventoryItem[];
  alternatives: AlternativeSupplier[];
}

export interface ImpactedComponent {
  supplier: string;
  component: string;
  affectedProducts: string[];
}

export interface ImpactedComponentWithInventory extends ImpactedComponent {
  stockDays: number;
  priority: InventoryPriority;
}

export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface RiskSummary {
  level: RiskLevel;
  estimatedDelayDays: number;
  criticalComponents: string[];
  reason: string;
}

export interface RecoveryOption {
  component: string;
  supplier: string;
  extraCost: string;
  confidence: number;
}

export interface RecoveryRecommendation {
  action: string;
  reason: string;
  options: RecoveryOption[];
  immediateActions: string[];
}
