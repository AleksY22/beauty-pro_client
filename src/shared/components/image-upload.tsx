/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUpload } from '../hooks/useUpload';
import { cn } from '../lib/utils';
import { ImagePlus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from './ui';
import { fileService } from '@/features/file/services/file.service';

interface ImageUploadProps {
   isDisabled: boolean;
   value: string | string[] | null | undefined;
   onChange: (value: any) => void;
   folder?: string;
}

export function ImageUpload({
   isDisabled,
   value,
   onChange,
   folder,
}: ImageUploadProps) {
   const [isDeleting, setIsDeleting] = useState(false);
   const valuesArray = Array.isArray(value) ? value : value ? [value] : [];

   const { handleButtonClick, handleFileChange, isUploading, fileInputRef } =
      useUpload({
         value,
         onChange,
         folder,
      });

   // Функция удаления
   const handleRemove = async (urlToRemove: string) => {
      if (isDeleting || isDisabled) return;

      try {
         setIsDeleting(true);

         // Вызываем метод очистки из fileService
         await fileService.deleteFiles(urlToRemove);

         // Обновляем состояние формы только после успешного удаления на бэкенде
         if (Array.isArray(value)) {
            onChange(value.filter((url) => url !== urlToRemove));
         } else {
            onChange('');
         }
      } catch (error) {
         toast.error(
            `Не удалось удалить изображение с сервера. Попробуйте еще раз. ${error}`,
         );
      } finally {
         setIsDeleting(false);
      }
   };

   return (
      <div>
         {valuesArray.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-5">
               {valuesArray.map((url) => (
                  <div
                     key={url}
                     className="relative w-50 h-50 rounded-md overflow-hidden"
                  >
                     <div className="absolute top-2 right-2 z-10">
                        <Button
                           type="button"
                           onClick={() => handleRemove(url)}
                           variant="destructive"
                           size="icon"
                           className="h-7 w-7 opacity-90 hover:opacity-100"
                           disabled={isDisabled || isDeleting}
                        >
                           <Trash2 className="size-4" />
                        </Button>
                     </div>
                     <Image
                        src={url}
                        alt="Картинка"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                     />
                  </div>
               ))}
            </div>
         )}

         {!Array.isArray(value) && value ? null : (
            <Button
               type="button"
               disabled={isDisabled || isUploading}
               variant="secondary"
               onClick={handleButtonClick}
               className={cn('', { 'mt-4': valuesArray.length })}
            >
               <ImagePlus className="size-4 mr-2" />
               Загрузить картинки
            </Button>
         )}

         <input
            type="file"
            multiple
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
            disabled={isDisabled}
         />
      </div>
   );
}
