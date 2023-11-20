import { Outlet } from "react-router-dom";
import "./bidder";

export function Bidder() {
  return (
    <div className="bidder">
      <Outlet />
    </div>
  );
}

export default Bidder;
