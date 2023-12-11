import { Outlet } from "react-router-dom";
import "./item";

export function Item() {
  return (
    <div className="item">
      <Outlet />
    </div>
  );
}

export default Item;
