import { Controller, FieldValues } from 'react-hook-form';
import { InputMask } from 'primereact/inputmask';
import classNames from 'classnames';
import { FormControllerProp } from '../form-controller-prop.interface';
import FormError from '../form-error/form-error';

export interface InputMaskControlProps<FieldsType extends FieldValues>
   extends FormControllerProp<FieldsType> {
   mask: string;
   label?: string;
   placeholder?: string;
   className?: string;
   hint?: string;
}

export function InputMaskControl<FieldsType extends FieldValues>({
   rules,
   label,
   control,
   name,
   placeholder,
   className,
   mask,
   hint
}: InputMaskControlProps<FieldsType>) {
   return (
      <Controller
         name={name}
         control={control}
         rules={rules}
         render={({ field, fieldState }) => (
            <div className="field mt-5">
               <span className="p-float-label">
                  <InputMask
                     id={field.name}
                     value={field.value}
                     onChange={(e) => field.onChange(e.target.value)}
                     mask={mask}
                     placeholder={placeholder}
                     className={classNames(
                        { 'p-invalid': fieldState.error },
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

export default InputMaskControl;
