import { useAddBidder, useGetBidder } from "@core/query/bidder.query";
import "./list-bidder";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";
import ErrorPage from "@shared/ui/error-page/error-page";
import { CreateBidderDto } from "@api/api";

export function ListBidder() {
  const { data: bidders, isLoading, isError, error } = useGetBidder();
  const { mutate: addBidder } = useAddBidder();

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
    <DataTable value={bidders?.data}>
      <Column field="name" header="Name"></Column>
      <Column field="email" header="email"></Column>
    </DataTable>
  );

  return (
    <div className="list-bidder">
      <h1>Welcome to, ListBidder</h1>
      <button
        onClick={() => {
          const newBidder = {
            name: "byong",
            email: "byong123@gmail.com",
          } as CreateBidderDto;
          addBidder(newBidder);
        }}
      >
        Add Bidder
      </button>

      {isLoading && displayLoading}
      {isError && !isLoading && displayError}
      {!isLoading && !isError && grid}
    </div>
  );
}

export default ListBidder;
