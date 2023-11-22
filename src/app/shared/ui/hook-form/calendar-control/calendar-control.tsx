import classNames from "classnames";
import { Calendar } from "primereact/calendar";
import { Controller, FieldValues } from "react-hook-form";
import { FormControllerProp } from "../form-controller-prop.interface";
import FormError from "../form-error/form-error";

export interface CalendarControlProps<FieldsType extends FieldValues>
  extends FormControllerProp<FieldsType> {
  format: string;
  label?: string;
  placeholder?: string;
  className?: string;
  hint?: string;
}

export function CalendarControl<FieldsType extends FieldValues>({
  rules,
  label,
  control,
  name,
  placeholder,
  className,
  format,
  hint,
}: CalendarControlProps<FieldsType>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="field mt-5">
          <span className="p-float-label">
            <Calendar
              inputId={field.name}
              value={field.value}
              onChange={field.onChange}
              dateFormat={format}
              placeholder={placeholder}
              className={classNames(
                { "p-invalid": fieldState.error },
                className
              )}
            />

            <label htmlFor={field.name}>{label}</label>
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

export default CalendarControl;
