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

      <div className="flex flex-col gap-2 p-7">
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
