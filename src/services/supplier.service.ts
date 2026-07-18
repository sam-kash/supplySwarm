import { Supplier } from "../types/domain.types";

export const findSupplierByName = (
  suppliers: readonly Supplier[],
  supplierName: string
): Supplier | undefined => {
  const normalizedSupplierName = supplierName.toLowerCase();

  return suppliers.find(
    (supplier) => supplier.name.toLowerCase() === normalizedSupplierName
  );
};
