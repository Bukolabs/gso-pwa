import HeaderContent from "@shared/ui/header-content/header-content";
import "./list-order";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useScreenSize from "@core/utility/screen-size";
import ViewSelection from "@core/ui/view-selection/view-selection";
import { useGetOrderQy } from "@core/query/order.query";

export function ListOrder() {
  const navigate = useNavigate();
  const { isMobileMode } = useScreenSize();
  const [isTableView, setIsTableView] = useState(!isMobileMode);  
  
  const rowLimit = 20;
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: purchaseOrders,
    isLoading,
    isError,
    error,
  } = useGetOrderQy(
    searchTerm,
    rowLimit,
    pageNumber,
    undefined,
    undefined
  );

  const handleTableViewMode = () => {
    setIsTableView(true);
  };
  const handleCardViewMode = () => {
    setIsTableView(false);
  };

  // const list = (
  //   <>
  //     <ViewSelection onTableView={handleTableViewMode} onCardView={handleCardViewMode} />
  //     <section className="clear-both">{!isTableView ? cards : grid}</section>
  //   </>
  // );

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
