import PurchaseCard from "@core/ui/purchase-card/purchase-card";
import "./purchase-order";
import HeaderContent from "@shared/ui/header-content/header-content";

export function PurchaseOrder() {
  return (
    <div className="purchase-order">
      <HeaderContent title="PurchaseOrder">
        <div></div>
      </HeaderContent>

      <div className="flex flex-col gap-2 p-7">
        <PurchaseCard title="PO# 122" subTitle="Food" status="Categorized" />
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
