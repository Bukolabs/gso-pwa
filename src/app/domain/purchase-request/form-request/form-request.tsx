import { useFormContext } from "react-hook-form";
import { RequestFormSchema } from "@core/model/form.rule";
import "./form-request";
import InputControl from "@shared/ui/hook-form/input-control/input-control";
import InputTextareaControl from "@shared/ui/hook-form/input-textarea-control/input-textarea-control";
import InputDateControl from "@shared/ui/hook-form/input-date-control/input-date-control";

export function FormRequest() {
  const { control } = useFormContext<RequestFormSchema>();

  return (
    <div className="form-request py-2 md:bg-white md:px-6">
      <InputDateControl<RequestFormSchema>
        control={control}
        name="dueDate"
        label="Due Date"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        hint="e.g. 30/12/2023"
      />
      <InputControl<RequestFormSchema>
        control={control}
        name="category"
        label="Category (Required)"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter Category"
        hint="e.g. Food"
      />
      <InputControl<RequestFormSchema>
        control={control}
        name="section"
        label="Section (Required)"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter Section"
        hint="e.g. Section Narra"
      />
      <InputControl<RequestFormSchema>
        control={control}
        name="sai"
        label="SAI"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter SAI"
        hint="e.g. 12345"
      />
      <InputDateControl<RequestFormSchema>
        control={control}
        name="saiDate"
        label="SAI Date"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        hint="e.g. 30/12/2023"
      />
      <InputControl<RequestFormSchema>
        control={control}
        name="alobs"
        label="ALOBS"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter ALOBS"
        hint="e.g. 12345"
      />
      <InputDateControl<RequestFormSchema>
        control={control}
        name="alobsDate"
        label="ALOBS Date"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        hint="e.g. 30/12/2023"
      />
      <InputTextareaControl<RequestFormSchema>
        control={control}
        name="purpose"
        label="Purpose"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter purpose of request"
        hint="e.g. for the betterment of fellow citizen"
      />
    </div>
  );
}

export default FormRequest;
