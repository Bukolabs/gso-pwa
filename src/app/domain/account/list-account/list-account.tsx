import "./list-account";
import { useNavigate } from "react-router-dom";
import HeaderContent from "@shared/ui/header-content/header-content";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { useGetAccountQy } from "@core/query/account.query";
import { useState } from "react";
import { Column } from "primereact/column";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { GetPersonDto } from "@api/api";
import SearchInput from "@shared/ui/search-input/search-input";

export function ListAccount() {
  const navigate = useNavigate();

  const [rowLimit, setRowLimit] = useState(20);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [first, setFirst] = useState(0);

  const {
    data: accounts,
    isLoading,
    isError,
  } = useGetAccountQy(searchTerm, rowLimit, pageNumber, undefined, undefined);

  const editRecord = (item: GetPersonDto) => {
    navigate(`${item.person_code}`);
  };
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    const offsetValue = event.page * rowLimit;
    setFirst(event.first);
    setPageNumber(offsetValue);
    setRowLimit(event.rows);
  };
  const nameColumn = (data: GetPersonDto) => {
    return `${data.person_first_name} ${data.person_last_name}`;
  };
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const filterElement = (
    <div className="flex gap-4">
      <SearchInput
        searchTerm={searchTerm}
        onSearch={handleSearch}
        placeholder="Search name or department"
        className="w-full block"
      />
    </div>
  );
  const grid = (
    <section>
      <DataTable
        value={accounts?.data}
        tableStyle={{ zIndex: 1 }}
        selectionMode="single"
        onSelectionChange={(e) => editRecord(e.value)}
      >
        <Column header="Name" body={nameColumn}></Column>
        <Column field="person_username" header="Username"></Column>
        <Column field="role_name" header="Role"></Column>
        <Column field="department_name" header="Department"></Column>
      </DataTable>

      <Paginator
        first={first}
        rows={rowLimit}
        totalRecords={accounts?.count}
        rowsPerPageOptions={[10, 20, 30]}
        onPageChange={onPageChange}
      />
    </section>
  );

  return (
    <div className="list-account">
      <HeaderContent title="Accounts">
        <Button
          label="Add"
          onClick={() => {
            navigate("./new");
          }}
        />
      </HeaderContent>

      <div className="p-7">
        {filterElement}
        {!isLoading && !isError && grid}
      </div>
    </div>
  );
}

export default ListAccount;
