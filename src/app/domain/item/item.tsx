import { Outlet } from "react-router-dom";
import "./item";
import { FormBrandItemProvider } from "./new-item/form-brand-item/brand.context";
import { FormUnitItemProvider } from "./new-item/form-unit-item/form-unit-item.context";

export function Item() {
  return (
    <div className="item">
      <FormBrandItemProvider>
        <FormUnitItemProvider>
          <Outlet />
        </FormUnitItemProvider>
      </FormBrandItemProvider>
    </div>
  );
}

export default Item;
