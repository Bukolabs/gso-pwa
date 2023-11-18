import classNames from 'classnames';
import { FieldError } from 'react-hook-form';

export interface FormErrorProps {
   error: FieldError | undefined;
   className: string;
}

export function FormError({ error, className }: FormErrorProps) {
   return (
      <div
         className={classNames(
            'text-sm text-left block text-red-500',
            className
         )}
      >
         <p>{error?.message}</p>
      </div>
   );
}

export default FormError;
