import { ItemFormSchema } from "@core/model/form.rule";
import "./form-item";
import { useFormContext } from "react-hook-form";
import InputControl from "@shared/ui/hook-form/input-control/input-control";
import InputTextareaControl from "@shared/ui/hook-form/input-textarea-control/input-textarea-control";
import { LabelValue } from "@shared/models/label-value.interface";
import DropdownControl from "@shared/ui/hook-form/dropdown-control/dropdown-control";
import { DropdownFilterEvent } from "primereact/dropdown";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { CreateUtilsBrandDto } from "@api/api";
import { Button } from "primereact/button";
import { useBrandFormHook } from "./brand.hook";

export interface FormItemProps {
  brands: LabelValue[];
  onAddBrand: (brand: CreateUtilsBrandDto) => void;
}

export function FormItem({ brands, onAddBrand }: FormItemProps) {
  const { control } = useFormContext<ItemFormSchema>();

  const {
    brandSidebar,
    newBrand,
    setBrandSidebar,
    setBrandFilter,
    setNewBrand,
    handleBrandFilterInput,
    handleAddBrand,
  } = useBrandFormHook(onAddBrand);

  return (
    <div className="form-item">
      <div className="form-request py-2 md:bg-white md:px-6">
        <InputControl<ItemFormSchema>
          control={control}
          name="name"
          label="Name (Required)"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter the item name"
          hint="e.g. Dyson Jet Focus fan heater"
        />
        <InputTextareaControl<ItemFormSchema>
          control={control}
          name="description"
          label="Description (Required)"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter the item description"
          hint="e.g. Amplifies airflow. To heat you or cool you fast"
        />

        <div className="">
          {newBrand && (
            <Sidebar
              visible={brandSidebar}
              onHide={() => setBrandSidebar(false)}
            >
              <h2>Create new brand</h2>
              <p>
                You are creating a new brand. Please, fill the fields to create
                a new brand and apply to current item creation.
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
                  onClick={handleAddBrand}
                  className="block"
                />
              </div>
            </Sidebar>
          )}
          <DropdownControl<ItemFormSchema>
            control={control}
            name="brand"
            label="Brand"
            options={brands}
            containerClassName="mb-9"
            className="w-full md:w-3/4"
            placeholder="Enter your brand name"
            hint="e.g. Dyson. If the brand doesn't exist hit ENTER to create a new brand"
            filter
            onFilter={(e: DropdownFilterEvent) => setBrandFilter(e.filter)}
            onKeyDown={handleBrandFilterInput}
          />
        </div>

        <InputControl<ItemFormSchema>
          control={control}
          name="unit"
          label="Unit (Required)"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter your mobile number"
          hint="e.g. piece"
        />
        <InputControl<ItemFormSchema>
          control={control}
          name="category"
          label="Category"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter your street address"
          hint="e.g. Appliance"
        />
      </div>
    </div>
  );
}

export default FormItem;
