import { Outlet } from "react-router-dom";
import "./monitor.scss";

export function Monitor() {
  return (
    <div className="monitor">
      <Outlet />
    </div>
  );
}

export default Monitor;
