import {
   Control,
   FieldError,
   FieldValues,
   Path,
   RegisterOptions,
} from 'react-hook-form';

export interface FormControllerProp<FieldsType extends FieldValues> {
   name: Path<FieldsType>;
   defaultValue?: string;
   rules?: RegisterOptions;
   error?: FieldError;
   control: Control<FieldsType>;
}
