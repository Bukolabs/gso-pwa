import { Controller, FieldValues } from "react-hook-form";
import { Dropdown, DropdownFilterEvent } from "primereact/dropdown";
import { SelectItemOptionsType } from "primereact/selectitem";
import classNames from "classnames";
import FormError from "../form-error/form-error";
import { FormControllerProp } from "../form-controller-prop.interface";

interface DropdownControlProps<FieldsType extends FieldValues>
  extends FormControllerProp<FieldsType> {
  label?: string;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  options?: SelectItemOptionsType;
  disabled?: boolean;
  hint?: string;
  filter?: boolean;
  onFilter?: (event: DropdownFilterEvent) => void;
  onKeyDown?: (event: any) => void;
}

export const DropdownControl = <FieldsType extends FieldValues>({
  rules,
  label,
  control,
  name,
  placeholder,
  className,
  containerClassName,
  options,
  disabled,
  hint,
  filter,
  onFilter,
  onKeyDown,
}: DropdownControlProps<FieldsType>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={classNames("field mt-5", containerClassName)}>
          <span className="p-float-label">
            <Dropdown
              value={field.value}
              placeholder={placeholder}
              name={name}
              options={options}
              onChange={(e) => field.onChange(e.value)}
              className={classNames(
                { "p-invalid": fieldState.error },
                className
              )}
              disabled={disabled}
              filter={filter}
              onFilter={onFilter}
              onKeyDown={onKeyDown}
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
};

export default DropdownControl;
