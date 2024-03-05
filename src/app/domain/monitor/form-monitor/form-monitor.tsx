import { InventoryFormSchema } from "@core/model/form.rule";
import "./form-monitor.scss";
import { useFormContext } from "react-hook-form";
import InputControl from "@shared/ui/hook-form/input-control/input-control";
import InputDateControl from "@shared/ui/hook-form/input-date-control/input-date-control";
import InputTextareaControl from "@shared/ui/hook-form/input-textarea-control/input-textarea-control";
import DropdownControl from "@shared/ui/hook-form/dropdown-control/dropdown-control";
import { LabelValue } from "@shared/models/label-value.interface";
import InputDigitControl from "@shared/ui/hook-form/input-digit-control/input-digit-control";

export function FormMonitor() {
  const { control } = useFormContext<InventoryFormSchema>();
  const propertyTypeOptions = [
    {
      label: "ICS",
      value: "ICS",
    },
    {
      label: "PAR",
      value: "PAR",
    },
  ] as LabelValue[];

  return (
    <div className="form-monitor py-2 md:bg-white md:px-6">
      <InputControl<InventoryFormSchema>
        control={control}
        name="inventoryNo"
        label="Inventory Number"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter inventory number"
      />
      <InputControl<InventoryFormSchema>
        control={control}
        name="lot"
        label="Lot"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter lot detail"
      />
      <InputControl<InventoryFormSchema>
        control={control}
        name="office"
        label="Office"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter office name"
      />
      <InputControl<InventoryFormSchema>
        control={control}
        name="building"
        label="Building"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter building name"
      />
      <InputDigitControl<InventoryFormSchema>
        control={control}
        name="endOfLife"
        label="End of life (Days)"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter end of life days"
      />
      <InputDateControl<InventoryFormSchema>
        control={control}
        name="dateAssigned"
        label="Date Assigned"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        hint="e.g. 30/12/2023"
      />
      <DropdownControl<InventoryFormSchema>
        control={control}
        name="propertyType"
        label="Mode of Procurement"
        options={propertyTypeOptions}
        containerClassName="mb-9"
        className="w-full md:w-3/4"
        placeholder="Enter your property type"
      />
      <InputControl<InventoryFormSchema>
        control={control}
        name="assignee"
        label="Assignee Name"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter name of assignee"
      />
      <InputTextareaControl<InventoryFormSchema>
        control={control}
        name="remarks"
        label="Remarks"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter remarks"
      />
    </div>
  );
}

export default FormMonitor;
