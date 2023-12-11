import "./list-bidder";
import { useGetBidder } from "@core/query/bidder.query";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";
import { ErrorSection } from "@shared/ui/error-section/error-section";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import HeaderContent from "@shared/ui/header-content/header-content";
import { useState } from "react";
import SearchInput from "@shared/ui/search-input/search-input";
import { Sidebar } from "primereact/sidebar";
import { GetBidderDto } from "@api/api";

export function ListBidder() {
  const navigate = useNavigate();
  const limit = 10;
  const [pageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPanel, setFilterPanel] = useState(false);
  const {
    data: bidders,
    isLoading,
    isError,
    error,
  } = useGetBidder(searchTerm, limit, pageNumber);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };
  const editRecord = (item: GetBidderDto) => {
    navigate(`${item.code}`);
  };

  const displayLoading = (
    <div className="card">
      <SkeletonList count={4} />
    </div>
  );
  const displayError = (
    <div className="card">
      <ErrorSection title="Error Occured" message={(error as any)?.message} />
    </div>
  );
  const filter = (
    <div className="flex gap-4">
      <SearchInput
        searchTerm={searchTerm}
        onSearch={handleSearch}
        placeholder="Search bidder name"
        className="w-full block"
      />
      <div>
        <Button
          className="block"
          label="Filter"
          severity="secondary"
          outlined
          onClick={() => setFilterPanel(true)}
        />
      </div>
      <Sidebar visible={filterPanel} onHide={() => setFilterPanel(false)}>
        <h2>Filters</h2>
        <p>
          Select the following filters you want to apply to the current table.
        </p>
      </Sidebar>
    </div>
  );
  const grid = (
    <DataTable
      value={bidders?.data}
      tableStyle={{ zIndex: 1 }}
      selectionMode="single"
      onSelectionChange={(e) => editRecord(e.value)}
    >
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

      <div className="p-7">
        {filter}
        {isLoading && displayLoading}
        {isError && !isLoading && displayError}
        {!isLoading && !isError && grid}
      </div>
    </div>
  );
}

export default ListBidder;
