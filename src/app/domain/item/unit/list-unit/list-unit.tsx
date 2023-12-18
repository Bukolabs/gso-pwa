import { useNavigate } from "react-router-dom";
import "./list-unit";
import { useState } from "react";
import { useGetUnit } from "@core/query/unit.query";
import { UtilsDataDto } from "@api/api";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";
import ErrorSection from "@shared/ui/error-section/error-section";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import SearchInput from "@shared/ui/search-input/search-input";
import HeaderContent from "@shared/ui/header-content/header-content";
import { Sidebar } from "primereact/sidebar";
import { Menu } from "primereact/menu";
import { useItemMenu } from "@domain/item/item-menu";
import { Button } from "primereact/button";

export function ListUnit() {
  const navigate = useNavigate();
  const { menu } = useItemMenu();
  const [visible, setVisible] = useState(false);
  const limit = 50;
  const [pageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: units,
    isLoading,
    isError,
    error,
  } = useGetUnit(searchTerm, limit, pageNumber);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };
  const editRecord = (item: UtilsDataDto) => {
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
      value={units?.data}
      tableStyle={{ zIndex: 1 }}
      selectionMode="single"
      onSelectionChange={(e) => editRecord(e.value)}
    >
      <Column field="name" header="Name"></Column>
      <Column field="description" header="Description"></Column>
    </DataTable>
  );
  const filter = (
    <div className="flex gap-4">
      <SearchInput
        searchTerm={searchTerm}
        onSearch={handleSearch}
        placeholder="Search unit name"
        className="w-full block"
      />
    </div>
  );

  return (
    <div className="list-unit">
      <HeaderContent title="Units">
        <div className="flex gap-2">
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

export default ListUnit;
