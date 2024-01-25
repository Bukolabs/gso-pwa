import { useFormContext } from "react-hook-form";
import { RequestFormSchema } from "@core/model/form.rule";
import "./form-request";
import InputControl from "@shared/ui/hook-form/input-control/input-control";
import InputTextareaControl from "@shared/ui/hook-form/input-textarea-control/input-textarea-control";
import InputDateControl from "@shared/ui/hook-form/input-date-control/input-date-control";
import CheckboxControl from "@shared/ui/hook-form/checkbox-control/checkbox-control";
import FormCategory from "./form-category/form-category";

export function FormRequest() {
  const { control } = useFormContext<RequestFormSchema>();

  return (
    <div className="form-request py-2 md:bg-white md:px-6">
      <InputDateControl<RequestFormSchema>
        control={control}
        name="dueDate"
        label="Issued Date"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        hint="e.g. 30/12/2023"
      />
      <FormCategory />
      <InputControl<RequestFormSchema>
        control={control}
        name="departmentLabel"
        label="Department"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter Section"
        disabled={true}
      />
      <InputControl<RequestFormSchema>
        control={control}
        name="section"
        label="Section (Required)"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter Section"
        hint="e.g. Registrar Office, Utility Office"
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
      <CheckboxControl<RequestFormSchema>
        control={control}
        name="isPPMP"
        label="Contains PPMP"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
      />
      <CheckboxControl<RequestFormSchema>
        control={control}
        name="isActivityDesign"
        label="Contains Activity Design"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
      />
    </div>
  );
}

export default FormRequest;
