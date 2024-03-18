import "./inventory-category.scss";
import { FieldValues, useFormContext } from "react-hook-form";
import { useFormCategoryItemContext } from "@domain/item/new-item/form-category-item/form-category-item.context";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import DropdownControl from "@shared/ui/hook-form/dropdown-control/dropdown-control";
import { DropdownFilterEvent } from "primereact/dropdown";
import { Path } from "react-hook-form";

export interface InventoryCategoryProps<T extends FieldValues> {
  name: Path<T>;
}

export function InventoryCategory<T extends FieldValues>({
  name,
}: InventoryCategoryProps<T>) {
  const { control } = useFormContext<T>();
  const {
    sidebar,
    newCategory,
    mappedCategories,
    isCreating,
    setSidebar,
    setFilter,
    setNewCategory,
    handleFilterInput,
    handleAdd,
  } = useFormCategoryItemContext();
  
  return (
    <div className="inventory-category">
      {newCategory && (
        <Sidebar visible={sidebar} onHide={() => setSidebar(false)}>
          <h2>Create new category</h2>
          <p>
            You are creating a new category. Please, fill the fields to create a
            new category and apply to current item creation.
          </p>
          <div className="flex flex-col gap-2 mt-4">
            <InputText
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e: any) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
            />
            <InputText
              placeholder="Category Description"
              value={newCategory.description}
              onChange={(e: any) =>
                setNewCategory({ ...newCategory, description: e.target.value })
              }
            />

            <Button
              label="Create"
              onClick={handleAdd}
              className="block"
              disabled={isCreating}
            />
          </div>
        </Sidebar>
      )}
      <DropdownControl<T>
        control={control}
        name={name}
        label="Category"
        options={mappedCategories}
        containerClassName="mb-9"
        className="w-full md:w-3/4"
        placeholder="Enter your category"
        hint="Select from the created category dropdown. Otherwise, hit ENTER to create a new category. If the category doesn't exist select N/A"
        filter
        onFilter={(e: DropdownFilterEvent) => setFilter(e.filter)}
        onKeyDown={handleFilterInput}
      />
    </div>
  );
}

export default InventoryCategory;
