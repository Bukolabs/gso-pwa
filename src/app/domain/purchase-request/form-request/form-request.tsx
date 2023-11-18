import { useFormContext } from "react-hook-form";
import { RequestFormSchema } from "@core/model/form.rule";
import "./form-request";
import InputControl from "@core/ui/hook-form/input-control/input-control";
import InputTextareaControl from "@core/ui/hook-form/input-textarea-control/input-textarea-control";

/* eslint-disable-next-line */
export interface FormRequestProps {}

export function FormRequest() {
  const { control } = useFormContext<RequestFormSchema>();

  return (
    <div className="form-request py-2 md:bg-white md:px-6">
      <InputControl<RequestFormSchema>
        control={control}
        name="category"
        label="Category (Required)"
        className="w-full md:w-3/4"
        placeholder="Enter SAI"
        hint="e.g. Food"
      />
      <InputControl<RequestFormSchema>
        control={control}
        name="section"
        label="Section (Required)"
        className="w-full md:w-3/4"
        placeholder="Enter SAI"
        hint="e.g. Section Narra"
      />
      <InputControl<RequestFormSchema>
        control={control}
        name="sai"
        label="SAI"
        className="w-full md:w-3/4"
        placeholder="Enter SAI"
        hint="e.g. 12345"
      />
      <InputControl<RequestFormSchema>
        control={control}
        name="alobs"
        label="ALOBS"
        className="w-full md:w-3/4"
        placeholder="Enter SAI"
        hint="e.g. 12345"
      />
      <InputTextareaControl<RequestFormSchema>
        control={control}
        name="purpose"
        label="Purpose"
        className="w-full md:w-3/4"
        placeholder="Enter purpose of request"
        hint="e.g. for the betterment of fellow citizen"
      />
    </div>
  );
}

export default FormRequest;
