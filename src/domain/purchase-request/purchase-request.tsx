import PurchaseCard from "../../core/ui/purchase-card/purchase-card";
import "./purchase-request";

/* eslint-disable-next-line */
export interface PurchaseRequestProps {}

export function PurchaseRequest() {
  return (
    <div className="purchase-request">
      <h1>PurchaseRequest</h1>
      <div className="flex flex-col gap-2">
        <PurchaseCard />
        <PurchaseCard hasReview={true} />
      </div>
    </div>
  );
}

export default PurchaseRequest;
