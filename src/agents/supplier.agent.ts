import { findSupplierByName } from "../services/supplier.service";
import { Supplier } from "../types/domain.types";

interface SupplierAgentInput {
  suppliers: readonly Supplier[];
  supplierName: string;
}

export const supplierAgent = async ({
  suppliers,
  supplierName,
}: SupplierAgentInput): Promise<Supplier | undefined> => {
  return findSupplierByName(suppliers, supplierName);
};
