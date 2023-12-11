import { Controller, FieldValues } from "react-hook-form";
import { FormControllerProp } from "../form-controller-prop.interface";
import { Checkbox } from "primereact/checkbox";
import classNames from "classnames";
import FormError from "../form-error/form-error";

export interface CheckboxControlProps<FieldsType extends FieldValues>
  extends FormControllerProp<FieldsType> {
  label?: string;
  className?: string;
  containerClassName?: string;
  hint?: string;
}

export function CheckboxControl<FieldsType extends FieldValues>({
  rules,
  label,
  control,
  name,
  className,
  containerClassName,
  hint,
}: CheckboxControlProps<FieldsType>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={classNames("field mt-5", containerClassName)}>
          <span className="p-float-label">
            <Checkbox
              inputId={"uniqueid"}
              checked={field.value}
              inputRef={field.ref}
              className={classNames(
                {
                  "p-invalid": fieldState.error,
                },
                className
              )}
              onChange={(e) => field.onChange(e.checked)}
            />
            <label className="ml-4" htmlFor={"uniqueid"}>
              {label}
            </label>
          </span>
          {hint && <small className="text-gray-400 mb-1">{hint}</small>}
          {fieldState.error && (
            <FormError error={fieldState.error} className="mt-1" />
          )}
        </div>
      )}
    />
  );
}

export default CheckboxControl;
