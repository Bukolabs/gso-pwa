import classNames from 'classnames';
import { InputText } from 'primereact/inputtext';
import { Controller, FieldValues } from 'react-hook-form';
import { FormControllerProp } from '../form-controller-prop.interface';
import FormError from '../form-error/form-error';
import { KeyboardEventHandler } from 'react';

export type InputControlType = 'text' | 'digit' | 'password' | 'date';
interface InputControlProps<FieldsType extends FieldValues>
   extends FormControllerProp<FieldsType> {
   label?: string;
   placeholder?: string;
   className?: string;
   containerClassName?: string;
   type?: InputControlType;
   disabled?: boolean;
   hint?: string;
   iconRight?: string;
   iconRightAction?: () => void;
   onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
}

export function InputControl<FieldsType extends FieldValues>({
   rules,
   label,
   control,
   name,
   placeholder,
   className,
   containerClassName,
   type,
   disabled,
   hint,
   iconRight,
   iconRightAction,
   onKeyDown,
}: InputControlProps<FieldsType>) {
   const iconRightClass = iconRight ? 'p-input-icon-right w-full' : '';
   const iconRightElement = iconRight ? (
      <i
         className={classNames(
            'pi',
            iconRight,
            iconRightAction ? 'cursor-pointer' : ''
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
            <div className={classNames('field mt-5', containerClassName)}>
               <span className={classNames('p-float-label', iconRightClass)}>
                  {iconRightElement}
                  <InputText
                     type={type}
                     id={field.name}
                     value={field.value}
                     placeholder={placeholder}
                     className={classNames(
                        { 'p-invalid': fieldState.error },
                        className
                     )}
                     onChange={(e) => field.onChange(e.target.value)}
                     disabled={disabled}
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
}

export default InputControl;
