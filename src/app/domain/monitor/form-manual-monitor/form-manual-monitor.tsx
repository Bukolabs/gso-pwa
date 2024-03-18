import { InventoryFormSchema } from "@core/model/form.rule";
import "./form-manual-monitor.scss";
import { useFormContext } from "react-hook-form";
import { Accordion, AccordionTab } from "primereact/accordion";
import InputControl from "@shared/ui/hook-form/input-control/input-control";
import InputDateControl from "@shared/ui/hook-form/input-date-control/input-date-control";
import DropdownControl from "@shared/ui/hook-form/dropdown-control/dropdown-control";
import { useGetDepartmentQy } from "@core/query/department.query";
import { LabelValue } from "@shared/models/label-value.interface";
import FormUnitItem from "@domain/item/new-item/form-unit-item/form-unit-item";
import { useFormBrandItemContext } from "@domain/item/new-item/form-brand-item/brand.context";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DropdownFilterEvent } from "primereact/dropdown";
import InputTextareaControl from "@shared/ui/hook-form/input-textarea-control/input-textarea-control";
import InputDigitControl from "@shared/ui/hook-form/input-digit-control/input-digit-control";
import AutocompleteControl from "@shared/ui/hook-form/autocomplete-control/autocomplete-control";
import { useState } from "react";
import { useGetItem } from "@core/query/item.query";
import {
  AutoCompleteCompleteEvent,
  AutoCompleteProps,
} from "primereact/autocomplete";
import InventoryCategory from "./inventory-category/inventory-category";

export function FormManualMonitor() {
  const { control, setValue } = useFormContext<InventoryFormSchema>();
  const { data: department } = useGetDepartmentQy("", 9999999, 0);
  const mappedDepartments = (department?.data || []).map(
    (item) =>
      ({
        label: item.description,
        value: item.code,
      } as LabelValue)
  );

  const procurementOptions = [
    {
      label: "RFQ",
      value: "RFQ",
    },
    {
      label: "ITB",
      value: "ITB",
    },
  ] as LabelValue[];

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
  const brandElement = () => (
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
      <DropdownControl<InventoryFormSchema>
        control={control}
        name="deliveryBrand"
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

  const limit = 99;
  const page = 0;
  const [enabledGetItem, setEnabledGetItem] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<LabelValue[]>([]);
  useGetItem(
    searchTerm,
    limit,
    page,
    undefined,
    undefined,
    enabledGetItem,
    (itemList) => {
      const mappedSuggestions = (itemList?.data || [])
        .map(
          (item) =>
            ({
              label: item.name,
              value: item.code,
            } as LabelValue)
        )
        .filter((x) => !!x.label);

      setSuggestions(mappedSuggestions);
    }
  );
  const handleItemSearch = (term: AutoCompleteCompleteEvent) => {
    setSearchTerm(term.query);
    setEnabledGetItem(true);
  };
  const handleAutocompleteSelect = (event: AutoCompleteProps) => {
    console.log({ event });
    const selectedItem = event.value;
    if (!selectedItem) {
      return;
    }

    setValue("itemCode", selectedItem.value);
    setValue("itemName", selectedItem.label);
  };

  return (
    <div className="form-manual-monitor">
      <Accordion activeIndex={[0, 1, 2]} multiple>
        <AccordionTab header="Purchase Order Information">
          <InputControl<InventoryFormSchema>
            control={control}
            name="poNo"
            label="PO Number"
            className="w-full md:w-3/4"
            containerClassName="pb-2"
            placeholder="Enter PO number"
          />
          <InventoryCategory<InventoryFormSchema> name="poCategory" />
          <InputDateControl<InventoryFormSchema>
            control={control}
            name="poDate"
            label="PO Date"
            className="w-full md:w-3/4"
            containerClassName="pb-2"
            hint="e.g. 30/12/2023"
            placeholder="Enter PO date"
          />
          <DropdownControl<InventoryFormSchema>
            control={control}
            name="procurementMode"
            label="Mode of procurement"
            options={procurementOptions}
            containerClassName="mb-9"
            className="w-full md:w-3/4"
            placeholder="Enter your procuremenet mode"
          />
          <InputControl<InventoryFormSchema>
            control={control}
            name="resolutionNo"
            label="Resolution No."
            className="w-full md:w-3/4"
            containerClassName="pb-2"
            placeholder="Enter resolution number"
          />
          <InputControl<InventoryFormSchema>
            control={control}
            name="iarNo"
            label="IAR No."
            className="w-full md:w-3/4"
            containerClassName="pb-2"
            placeholder="Enter IAR number"
          />
        </AccordionTab>
        <AccordionTab header="Purchase Request Information">
          <InputControl<InventoryFormSchema>
            control={control}
            name="prNo"
            label="PR Number"
            className="w-full md:w-3/4"
            containerClassName="pb-2"
            placeholder="Enter PR number"
          />
          <InputDateControl<InventoryFormSchema>
            control={control}
            name="prDate"
            label="PR Date"
            className="w-full md:w-3/4"
            containerClassName="pb-2"
            hint="e.g. 30/12/2023"
          />
          <InventoryCategory<InventoryFormSchema> name="prCategory" />
          <DropdownControl<InventoryFormSchema>
            control={control}
            name="prDepartment"
            label="PR Department"
            options={mappedDepartments}
            containerClassName="mb-9"
            className="w-full md:w-3/4"
            placeholder="Enter your department"
            hint="Select from the created department dropdown"
            filter
          />
          <InputControl<InventoryFormSchema>
            control={control}
            name="prSection"
            label="PR Section"
            className="w-full md:w-3/4"
            containerClassName="pb-2"
            placeholder="Enter PR section"
          />
          <InputTextareaControl<InventoryFormSchema>
            control={control}
            name="prPurpose"
            label="PR Purpose"
            containerClassName="mb-9"
            className="w-full md:w-3/4"
            placeholder="Enter PR purpose"
          />
        </AccordionTab>
        <AccordionTab header="Item Information">
          <AutocompleteControl<InventoryFormSchema>
            control={control}
            suggestions={suggestions || []}
            name="itemName"
            label="Search Name (Required)"
            containerClassName="mb-9"
            className="w-full md:w-3/4"
            placeholder="Enter the item name"
            hint="Search items you want to add in the request e.g Dyson Jet fan heater"
            onSearch={handleItemSearch}
            onSelect={handleAutocompleteSelect}
          />

          <FormUnitItem />
          {brandElement()}
          <InputDigitControl<InventoryFormSchema>
            control={control}
            name="itemPrice"
            label="Price"
            containerClassName="mb-9"
            className="w-full md:w-3/4"
            placeholder="Enter the item cost"
            hint="e.g. 150"
            mode="currency"
            currency="PHP"
          />
          <InputTextareaControl<InventoryFormSchema>
            control={control}
            name="deliveryDescription"
            label="Description"
            className="w-full md:w-3/4"
            containerClassName="pb-2"
            placeholder="Enter delivery description"
          />
        </AccordionTab>
        <AccordionTab header="Supplier">
          <InputControl<InventoryFormSchema>
            control={control}
            name="supplier"
            label="Name"
            className="w-full md:w-3/4"
            containerClassName="pb-2"
            placeholder="Enter supplier name"
          />
          <InputControl<InventoryFormSchema>
            control={control}
            name="supplierContact"
            label="Contact"
            className="w-full md:w-3/4"
            containerClassName="pb-2"
            placeholder="Enter supplier contact"
          />
          <InputControl<InventoryFormSchema>
            control={control}
            name="supplierAddress"
            label="Address"
            className="w-full md:w-3/4"
            containerClassName="pb-2"
            placeholder="Enter supplier address"
          />
          <InputControl<InventoryFormSchema>
            control={control}
            name="supplierEmail"
            label="Email"
            className="w-full md:w-3/4"
            containerClassName="pb-2"
            placeholder="Enter supplier email"
          />
          <InputControl<InventoryFormSchema>
            control={control}
            name="supplierTin"
            label="TIN"
            className="w-full md:w-3/4"
            containerClassName="pb-2"
            placeholder="Enter supplier TIN"
          />
        </AccordionTab>
      </Accordion>
    </div>
  );
}

export default FormManualMonitor;
