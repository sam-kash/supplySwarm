import { Dependency, ImpactedComponent } from "../types/domain.types";

export const findImpactedComponentsBySupplier = (
  dependencies: readonly Dependency[],
  supplierName: string
): ImpactedComponent[] => {
  const normalizedSupplierName = supplierName.toLowerCase();

  return dependencies
    .filter(
      (dependency) =>
        dependency.supplier.toLowerCase() === normalizedSupplierName
    )
    .map((dependency) => ({
      supplier: dependency.supplier,
      component: dependency.component,
      affectedProducts: dependency.products,
    }));
};
