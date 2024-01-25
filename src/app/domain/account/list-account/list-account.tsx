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

export function ListAccount() {
  const navigate = useNavigate();

  const rowLimit = 20;
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm] = useState("");
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
    setFirst(event.first);
    const offsetValue = event.page * rowLimit;
    setPageNumber(offsetValue);
  };
  const nameColumn = (data: GetPersonDto) => {
    return `${data.person_first_name} ${data.person_last_name}`;
  };

  const grid = (
    <section>
      <DataTable
        value={accounts?.data}
        tableStyle={{ zIndex: 1 }}
        selectionMode="single"
        onSelectionChange={(e) => editRecord(e.value)}
      >
        <Column header="Name" body={nameColumn}></Column>
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

      <div className="p-7">{!isLoading && !isError && grid}</div>
    </div>
  );
}

export default ListAccount;
