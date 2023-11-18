import { Controller, FieldValues } from 'react-hook-form';
import { FormControllerProp } from '../form-controller-prop.interface';
import FormError from '../form-error/form-error';
import ImageField from './form-image/image-field';
import classNames from 'classnames';

export interface ImageControlProps<FieldsType extends FieldValues>
   extends FormControllerProp<FieldsType> {
   label?: string;
   className?: string;
   controlClassName?: string;
   disabled?: boolean;
   imageChange?: (image: File | undefined) => void;
}

export function ImageControl<FieldsType extends FieldValues>({
   rules,
   label,
   control,
   name,
   className,
   controlClassName,
   disabled,
   imageChange,
}: ImageControlProps<FieldsType>) {
   return (
      <Controller
         name={name}
         control={control}
         rules={rules}
         render={({ field, fieldState }) => {
            return (
               <div className={classNames(controlClassName)}>
                  <ImageField
                     label={label}
                     urlImage={field.value}
                     onImageChange={(e) => {
                        field.onChange(e);

                        if (imageChange) {
                           imageChange(e);
                        }
                     }}
                     disabled={disabled}
                     className={className}
                  />
                  {fieldState.error && (
                     <FormError error={fieldState.error} className="mt-1" />
                  )}
               </div>
            );
         }}
      />
   );
}

export default ImageControl;
