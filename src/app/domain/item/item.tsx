import { Outlet } from "react-router-dom";
import "./item";
import { BrandProvider } from "./new-item/form-item/brand.context";

export function Item() {
  return (
    <div className="item">
      <BrandProvider>
        <Outlet />
      </BrandProvider>
    </div>
  );
}

export default Item;
