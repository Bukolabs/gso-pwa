import PurchaseCard from "@core/ui/purchase-card/purchase-card";
import "./purchase-order";
import HeaderContent from "@shared/ui/header-content/header-content";

export function PurchaseOrder() {
  return (
    <div className="purchase-order">
      <HeaderContent title="PurchaseOrder">
        <div></div>
      </HeaderContent>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-7 items-baseline">
        <PurchaseCard
          code="-"
          title="PO# 122"
          subTitle="Food"
          status="Categorized"
          reviewers={[]}
          onClick={() => {}}
        />
        <PurchaseCard
          code="-"
          title="PO# 144"
          subTitle="Office Supply"
          status="Review"
          reviewers={[]}
          onClick={() => {}}
        />
      </div>
    </div>
  );
}

export default PurchaseOrder;
