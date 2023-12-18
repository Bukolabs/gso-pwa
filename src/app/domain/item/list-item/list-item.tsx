import { useNavigate } from "react-router-dom";
import "./list-item";
import { useState } from "react";
import { useGetItem } from "@core/query/item.query";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";
import ErrorSection from "@shared/ui/error-section/error-section";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import SearchInput from "@shared/ui/search-input/search-input";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import HeaderContent from "@shared/ui/header-content/header-content";
import { GetItemDto } from "@api/api";
import { Menu } from "primereact/menu";
import { useItemMenu } from "../item-menu";

export function ListItem() {
  const navigate = useNavigate();
  const { menu } = useItemMenu();
  const limit = 50;
  const [pageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPanel, setFilterPanel] = useState(false);
  const {
    data: bidders,
    isLoading,
    isError,
    error,
  } = useGetItem(searchTerm, limit, pageNumber);
  const [visible, setVisible] = useState(false);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };
  const editRecord = (item: GetItemDto) => {
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
  const grid = (
    <DataTable
      value={bidders?.data}
      tableStyle={{ zIndex: 1 }}
      selectionMode="single"
      onSelectionChange={(e) => editRecord(e.value)}
    >
      <Column field="name" header="Name"></Column>
      <Column field="brand_name" header="Brand"></Column>
    </DataTable>
  );
  const filter = (
    <div className="flex gap-4">
      <SearchInput
        searchTerm={searchTerm}
        onSearch={handleSearch}
        placeholder="Search item name"
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

  return (
    <div className="list-bidder">
      <HeaderContent title="Items">
        <div className="flex gap-2">
          <Button
            label="Add"
            onClick={() => {
              navigate("./new");
            }}
          />
          <Button label="Settings" outlined onClick={() => setVisible(true)} />
        </div>
      </HeaderContent>

      <div className="p-7">
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <h2>Item Settings</h2>
          <p>Select the following menu to set item settings</p>

          <Menu model={menu} className="w-full" />
        </Sidebar>

        {filter}
        {isLoading && displayLoading}
        {isError && !isLoading && displayError}
        {!isLoading && !isError && grid}
      </div>
    </div>
  );
}

export default ListItem;
