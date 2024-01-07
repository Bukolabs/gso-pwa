import HeaderContent from "@shared/ui/header-content/header-content";
import "./list-order";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useScreenSize from "@core/utility/screen-size";

export function ListOrder() {
  const navigate = useNavigate();
  const { isMobileMode } = useScreenSize();
  const [isTableView, setIsTableView] = useState(!isMobileMode);

  return (
    <div className="list-order">
      <HeaderContent title="Orders">
        <Button
          className="w-full block md:m-0"
          label="New"
          onClick={() => navigate("new")}
          text={!isTableView}
        ></Button>
      </HeaderContent>

      <div className="p-7"></div>
    </div>
  );
}

export default ListOrder;
