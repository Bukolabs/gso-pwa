import { Controller, FieldValues } from 'react-hook-form';
import { FormControllerProp } from '../form-controller-prop.interface';
import { InputNumber } from 'primereact/inputnumber';
import classNames from 'classnames';
import FormError from '../form-error/form-error';

export interface InputDigitControlProps<FieldsType extends FieldValues>
   extends FormControllerProp<FieldsType> {
   label?: string;
   className?: string;
   hint?: string;
}

export function InputDigitControl<FieldsType extends FieldValues>({
   rules,
   label,
   control,
   name,
   className,
   hint
}: InputDigitControlProps<FieldsType>) {
   return (
      <Controller
         name={name}
         control={control}
         rules={rules}
         render={({ field, fieldState }) => (
            <div className="field mt-5">
               <span className="p-float-label">
                  <InputNumber
                     id={field.name}
                     value={field.value}
                     onBlur={field.onBlur}
                     onValueChange={(e) => field.onChange(e)}
                     useGrouping={false}
                     inputClassName={classNames(
                        {
                           'p-invalid': fieldState.error,
                        },
                        className
                     )}
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

export default InputDigitControl;
