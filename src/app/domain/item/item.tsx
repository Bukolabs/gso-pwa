import { Outlet } from "react-router-dom";
import "./item";
import { FormBrandItemProvider } from "./new-item/form-brand-item/brand.context";
import { FormUnitItemProvider } from "./new-item/form-unit-item/form-unit-item.context";
import { FormCategoryItemProvider } from "./new-item/form-category-item/form-category-item.context";

export function Item() {
  return (
    <div className="item">
      <FormBrandItemProvider>
        <FormUnitItemProvider>
          <FormCategoryItemProvider>
            <Outlet />
          </FormCategoryItemProvider>
        </FormUnitItemProvider>
      </FormBrandItemProvider>
    </div>
  );
}

export default Item;
