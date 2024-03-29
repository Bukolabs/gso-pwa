import { Sidebar } from "primereact/sidebar";
import "./form-brand-item";
import { useFormBrandItemContext } from "./brand.context";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import DropdownControl from "@shared/ui/hook-form/dropdown-control/dropdown-control";
import { ItemFormSchema } from "@core/model/form.rule";
import { useFormContext } from "react-hook-form";
import { DropdownFilterEvent } from "primereact/dropdown";

export function FormBrandItem() {
  const { control } = useFormContext<ItemFormSchema>();
  const {
    sidebar,
    newBrand,
    mappedBrands,
    isCreating,
    setSidebar,
    setFilter,
    setNewBrand,
    handleFilterInput,
    handleAdd,
  } = useFormBrandItemContext();

  return (
    <div className="form-brand-item">
      {newBrand && (
        <Sidebar visible={sidebar} onHide={() => setSidebar(false)}>
          <h2>Create new brand</h2>
          <p>
            You are creating a new brand. Please, fill the fields to create a
            new brand and apply to current item creation.
          </p>
          <div className="flex flex-col gap-2 mt-4">
            <InputText
              placeholder="Brand Name"
              value={newBrand.name}
              onChange={(e: any) =>
                setNewBrand({ ...newBrand, name: e.target.value })
              }
            />
            <InputText
              placeholder="Brand Description"
              value={newBrand.description}
              onChange={(e: any) =>
                setNewBrand({ ...newBrand, description: e.target.value })
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
      <DropdownControl<ItemFormSchema>
        control={control}
        name="brand"
        label="Brand"
        options={mappedBrands}
        containerClassName="mb-9"
        className="w-full md:w-3/4"
        placeholder="Enter your brand name"
        hint="e.g. Dyson. Hit ENTER to create a new brand. Otherwise, if the brand doesn't exist select N/A"
        filter
        onFilter={(e: DropdownFilterEvent) => setFilter(e.filter)}
        onKeyDown={handleFilterInput}
      />
    </div>
  );
}

export default FormBrandItem;
