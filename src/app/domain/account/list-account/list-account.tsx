import "./list-account";
import { useNavigate } from "react-router-dom";
import HeaderContent from "@shared/ui/header-content/header-content";
import { Button } from "primereact/button";

export function ListAccount() {
  const navigate = useNavigate();

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
    </div>
  );
}

export default ListAccount;
