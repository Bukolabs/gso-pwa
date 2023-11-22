import "./list-bidder";
import { useGetBidder } from "@core/query/bidder.query";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";
import ErrorPage from "@shared/ui/error-page/error-page";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import HeaderContent from "@shared/ui/header-content/header-content";

export function ListBidder() {
  const navigate = useNavigate();
  const { data: bidders, isLoading, isError, error } = useGetBidder();

  const displayLoading = (
    <div className="card">
      <SkeletonList count={4} />
    </div>
  );
  const displayError = (
    <div className="card">
      <ErrorPage title="Error Occured" message={(error as any)?.message} />
    </div>
  );
  const grid = (
    <DataTable value={bidders?.data} tableStyle={{ zIndex: 1 }}>
      <Column field="name" header="Name"></Column>
      <Column field="email" header="email"></Column>
    </DataTable>
  );

  return (
    <div className="list-bidder">
      <HeaderContent title="Bidders">
        <Button
          label="Add"
          onClick={() => {
            navigate("./new");
          }}
        />
      </HeaderContent>

      <div className="p-7 ">
        {isLoading && displayLoading}
        {isError && !isLoading && displayError}
        {!isLoading && !isError && grid}
      </div>
    </div>
  );
}

export default ListBidder;
