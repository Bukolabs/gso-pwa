import { ItemFormSchema } from "@core/model/form.rule";
import "./form-unit-item";
import { useFormContext } from "react-hook-form";
import { useFormUnitItemContext } from "./form-unit-item.context";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import DropdownControl from "@shared/ui/hook-form/dropdown-control/dropdown-control";
import { DropdownFilterEvent } from "primereact/dropdown";

export function FormUnitItem() {
  const { control } = useFormContext<ItemFormSchema>();
  const {
    sidebar,
    newUnit,
    mappedUnits,
    isCreating,
    setSidebar,
    setFilter,
    setNewUnit,
    handleFilterInput,
    handleAdd,
  } = useFormUnitItemContext();

  return (
    <div className="form-unit-item">
      {newUnit && (
        <Sidebar visible={sidebar} onHide={() => setSidebar(false)}>
          <h2>Create new unit</h2>
          <p>
            You are creating a new unit. Please, fill the fields to create a new
            unit and apply to current item creation.
          </p>
          <div className="flex flex-col gap-2 mt-4">
            <InputText
              placeholder="Unit Name"
              value={newUnit.name}
              onChange={(e: any) =>
                setNewUnit({ ...newUnit, name: e.target.value })
              }
            />
            <InputText
              placeholder="Unit Description"
              value={newUnit.description}
              onChange={(e: any) =>
                setNewUnit({ ...newUnit, description: e.target.value })
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
        name="unit"
        label="Unit"
        options={mappedUnits}
        containerClassName="mb-9"
        className="w-full md:w-3/4"
        placeholder="Enter the unit"
        hint="e.g. Piece / Pack / Box. If the unit doesn't exist hit ENTER to create a new unit"
        filter
        onFilter={(e: DropdownFilterEvent) => setFilter(e.filter)}
        onKeyDown={handleFilterInput}
      />
    </div>
  );
}

export default FormUnitItem;
