import { InputText } from "primereact/inputtext";
import "./pr-item-action.scss";
import { useFormBrandItemContext } from "@domain/item/new-item/form-brand-item/brand.context";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Dropdown, DropdownFilterEvent } from "primereact/dropdown";
import { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { ItemFormSchema } from "@core/model/form.rule";

export interface PrItemActionProps {
  item: ItemFormSchema;
  onUpdate: (
    item: ItemFormSchema,
    brand: string,
    deliveredQuantity: number | null,
    newQuantity: number | null
  ) => void;
}

export function PrItemAction({ item, onUpdate }: PrItemActionProps) {
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
  const [selectedBrand, setSelectedBrand] = useState("");
  const [deliveredQuantity, setDeliveredQuantity] = useState<number | null>(
    null
  );
  const [newQuantity, setNewQuantity] = useState<number | null>(null);

  const handleUpdate = () => {
    onUpdate(item, selectedBrand, deliveredQuantity, newQuantity);
  };

  return (
    <div className="pr-item-action">
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

      <section className="m-2 mb-4">
        <span className="p-2 flex flex-col">
          <label>Quantity</label>
          <InputNumber
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.value)}
          />
        </span>
        <span className="p-2 flex flex-col">
          <label>Delivered Quantity:</label>
          <InputNumber
            value={deliveredQuantity}
            onChange={(e) => setDeliveredQuantity(e.value)}
          />
        </span>
        <span className="p-2 flex flex-col">
          <label>Brand Name:</label>
          <Dropdown
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.value)}
            options={mappedBrands}
            className="w-full md:w-3/4"
            placeholder="Enter your brand name"
            filter
            onFilter={(e: DropdownFilterEvent) => setFilter(e.filter)}
            onKeyDown={handleFilterInput}
          />
        </span>
        <Button className="block m-2" label="Update" onClick={handleUpdate} />
      </section>
    </div>
  );
}

export default PrItemAction;
