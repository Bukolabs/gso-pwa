import { Controller, FieldValues } from "react-hook-form";
import { FormControllerProp } from "../form-controller-prop.interface";
import { KeyboardEventHandler } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import classNames from "classnames";
import FormError from "../form-error/form-error";

export interface InputTextareaControlProps<FieldsType extends FieldValues>
  extends FormControllerProp<FieldsType> {
  rows?: number;
  cols?: number;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  hint?: string;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
}

export function InputTextareaControl<FieldsType extends FieldValues>({
  rows = 5,
  cols = 30,
  rules,
  label,
  control,
  name,
  placeholder,
  className,
  disabled,
  hint,
  onKeyDown,
}: InputTextareaControlProps<FieldsType>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="field mt-5">
          <span className="p-float-label">
            <InputTextarea
              id={field.name}
              value={field.value}
              rows={rows}
              cols={cols}
              disabled={disabled}
              placeholder={placeholder}
              className={classNames(
                { "p-invalid": fieldState.error },
                className
              )}
              onChange={(e) => field.onChange(e.target.value)}
              onKeyDown={onKeyDown}
            />

            <label htmlFor={field.name}>{label}</label>
          </span>
          {hint && <p className="text-gray-400 mb-1">{hint}</p>}
          {fieldState.error && (
            <FormError error={fieldState.error} className="mt-1" />
          )}
        </div>
      )}
    />
  );
}

export default InputTextareaControl;
