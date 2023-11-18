import { Button } from 'primereact/button';
import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react';

const evaluateUrlImageIsPreviewable = (specimen: string | File | undefined) => {
   if (typeof specimen === 'string') {
      return true;
   }

   return false;
};

const reCreateImagePreviewIfBlob = (specimen: string | File | undefined) => {
   if (typeof specimen === 'object' && typeof specimen?.['name'] === 'string') {
      const blobEntity = URL.createObjectURL(specimen);
      return blobEntity;
   }

   return '';
};

export interface FormImageProps {
   urlImage?: string | File;
   label?: string;
   disabled?: boolean;
   className?: string;
   onImageChange?: (image: File | undefined) => void;
}

export function ImageField({
   label,
   urlImage,
   disabled,
   className = 'w-10rem h-10rem',
   onImageChange,
}: FormImageProps) {
   const [imageFilePreview, setImageFilePreview] = useState<string>(
      reCreateImagePreviewIfBlob(urlImage)
   );
   const [onDemandUpload, setOnDemandUpload] = useState(false);
   const fileInputRef = useRef<HTMLInputElement>(null);

   const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files || event.target.files.length === 0) return;

      const image = event?.target?.files[0];
      const objectUrl = URL.createObjectURL(image);
      setImageFilePreview(objectUrl);

      if (onImageChange) {
         onImageChange(image);
      }
   };

   const uploadMode = (event: SyntheticEvent) => {
      event.preventDefault();
      setOnDemandUpload(true);
   };

   const handleRemoveImage = (event: SyntheticEvent) => {
      if (fileInputRef.current) {
         setImageFilePreview('');
         fileInputRef.current.value = '';
      }

      if (onImageChange) {
         onImageChange(undefined);
      }
   };

   const imageInput = (
      <>
         {imageFilePreview && (
            <img src={imageFilePreview} alt="product" className={className} />
         )}
         <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="my-2"
         />
         {imageFilePreview && (
            <div>
               <Button
                  label="Remove Photo"
                  onClick={handleRemoveImage}
                  severity="secondary"
                  text
               />
            </div>
         )}
      </>
   );
   const imagePreview = (
      <>
         <img
            src={urlImage as string}
            alt={urlImage as string}
            className={className}
         />
         <div className="mt-2">
            <Button onClick={uploadMode} size="small" disabled={disabled} text>
               Change
            </Button>
         </div>
      </>
   );
   const display = () => {
      if (evaluateUrlImageIsPreviewable(urlImage) && !onDemandUpload) {
         return imagePreview;
      }

      return imageInput;
   };

   return (
      <div>
         {label && <label className="text-gray-500 mb-2">{label}</label>}
         <div>{display()}</div>
      </div>
   );
}

export default ImageField;
