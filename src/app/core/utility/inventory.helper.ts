import { InventoryStatus } from "@core/model/inventory-status.enum";

export const getInventoryStatusName = (status: InventoryStatus) => {
  const records = {
    [InventoryStatus.PRE_REG]: "Pre-Registered",
    [InventoryStatus.REG]: "Registered",
    [InventoryStatus.DMG]: "Damaged",
    [InventoryStatus.REPAIR]: "Repaired",
    [InventoryStatus.LOST]: "Lost",
    [InventoryStatus.STOLEN]: "Stolen",
    [InventoryStatus.DISPOSED]: "Disposed",
    [InventoryStatus.RETURNED]: "Returned",
    [InventoryStatus.ASSIGNED]: "Assigned",
  };

  return records[status];
};
