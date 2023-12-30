import { Outlet } from "react-router-dom";
import "./account";
export function Account() {
  return (
    <div className="account">
      <Outlet />
    </div>
  );
}

export default Account;
