import { Button } from "primereact/button";
import "./list-request";
import { useNavigate } from "react-router-dom";
import PurchaseCard from "@core/ui/purchase-card/purchase-card";
import useScreenSize from "@core/utility/screen-size";
import HeaderContent from "@shared/ui/header-content/header-content";

export function ListRequest() {
  const navigate = useNavigate();
  const { isMobile } = useScreenSize();

  return (
    <div className="list-request">
      <HeaderContent title="Requests">
        <Button
          className="w-full block md:m-0"
          label="New"
          onClick={() => navigate("new")}
          text={isMobile}
        ></Button>
      </HeaderContent>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-7 items-baseline">
        <PurchaseCard
          title="PR# 122"
          subTitle="Department of Tourism"
          status="Submitted"
        />
        <PurchaseCard
          title="PR# 144"
          subTitle="Department of Labor"
          status="Review"
          hasReview={true}
        />
      </div>
    </div>
  );
}

export default ListRequest;
