import classNames from "classnames";
import { InputText } from "primereact/inputtext";
import { Controller, FieldValues } from "react-hook-form";
import { FormControllerProp } from "../form-controller-prop.interface";
import FormError from "../form-error/form-error";
import { KeyboardEventHandler } from "react";

interface InputDateControlProps<FieldsType extends FieldValues>
  extends FormControllerProp<FieldsType> {
  label?: string;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  hint?: string;
  iconRight?: string;
  iconRightAction?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
}

export function InputDateControl<FieldsType extends FieldValues>({
  rules,
  label,
  control,
  name,
  placeholder,
  className,
  containerClassName,
  disabled,
  hint,
  iconRight,
  iconRightAction,
  onKeyDown,
}: InputDateControlProps<FieldsType>) {
  const iconRightClass = iconRight ? "p-input-icon-right w-full" : "";
  const iconRightElement = iconRight ? (
    <i
      className={classNames(
        "pi",
        iconRight,
        iconRightAction ? "cursor-pointer" : ""
      )}
      onClick={() => {
        if (!iconRightAction) {
          return;
        }

        iconRightAction();
      }}
    />
  ) : null;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        return (
          <div className={classNames("field mt-5", containerClassName)}>
            <span
              className={classNames(
                "flex flex-col-reverse gap-1",
                iconRightClass
              )}
            >
              {iconRightElement}
              <InputText
                type="date"
                id={field.name}
                value={field.value}
                placeholder={placeholder}
                className={classNames(
                  { "p-invalid": fieldState.error },
                  className
                )}
                onChange={(e) => field.onChange(e.target.value)}
                disabled={disabled}
                onKeyDown={onKeyDown}
              />

              <label className="text-xs text-gray-500" htmlFor={field.name}>
                {label}
              </label>
            </span>
            {hint && <small className="text-gray-400 mb-1">{hint}</small>}
            {fieldState.error && <FormError error={fieldState.error} />}
          </div>
        );
      }}
    />
  );
}

export default InputDateControl;
