import PurchaseCard from "@core/ui/purchase-card/purchase-card";
import "./purchase-order";

/* eslint-disable-next-line */
export interface PurchaseOrderProps {}

export function PurchaseOrder() {
  return (
    <div className="purchase-order">
      <h1>PurchaseOrder</h1>
      <div className="flex flex-col gap-2">
        <PurchaseCard
          title="PO# 122"
          subTitle="Food"
          status="Categorized"
        />
        <PurchaseCard
          title="PO# 144"
          subTitle="Office Supply"
          status="Review"
          hasReview={true}
        />
      </div>
    </div>
  );
}

export default PurchaseOrder;
