import { Outlet } from "react-router-dom";
import "./monitor.scss";
import { MonitorFilterProvider } from "./list-monitor/list-monitor-filter.context";

export function Monitor() {
  return (
    <div className="monitor">
      <MonitorFilterProvider>
        <Outlet />
      </MonitorFilterProvider>
    </div>
  );
}

export default Monitor;
