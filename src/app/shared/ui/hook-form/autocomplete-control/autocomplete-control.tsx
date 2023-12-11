import classNames from "classnames";
import { Controller, FieldValues } from "react-hook-form";
import { FormControllerProp } from "../form-controller-prop.interface";
import FormError from "../form-error/form-error";
import { KeyboardEventHandler } from "react";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
  AutoCompleteProps,
} from "primereact/autocomplete";
import { LabelValue } from "@shared/models/label-value.interface";

interface AutocompleteControlProps<FieldsType extends FieldValues>
  extends FormControllerProp<FieldsType> {
  suggestions: LabelValue[];
  label?: string;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  hint?: string;
  iconRight?: string;
  onSearch: (event: AutoCompleteCompleteEvent) => void;
  iconRightAction?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
  onBlur?: () => void;
  onSelect?: (event: AutoCompleteProps) => void
}

export function AutocompleteControl<FieldsType extends FieldValues>({
  rules,
  label,
  control,
  name,
  suggestions,
  placeholder,
  className,
  containerClassName,
  disabled,
  hint,
  iconRight,
  onSearch,
  iconRightAction,
  onKeyDown,
  onBlur,
  onSelect
}: AutocompleteControlProps<FieldsType>) {
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
      render={({ field, fieldState }) => (
        <div className={classNames("field mt-5", containerClassName)}>
          <span className={classNames("p-float-label", iconRightClass)}>
            {iconRightElement}
            <AutoComplete
              id={field.name}
              value={field.value}
              placeholder={placeholder}
              suggestions={suggestions}
              field="label"
              className={classNames(
                { "p-invalid": fieldState.error },
                className
              )}
              completeMethod={onSearch}
              onChange={(e) => field.onChange(e.target.value)}
              disabled={disabled}
              onKeyDown={onKeyDown}
              onBlur={onBlur}
              onSelect={onSelect}
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

export default AutocompleteControl;
