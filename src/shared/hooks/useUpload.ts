/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useCallback, useMemo, useRef } from 'react';
import { toast } from 'sonner';

import { fileService } from '@/features/file/services/file.service';

interface UseUploadProps {
   value: string | string[] | null | undefined;
   onChange: (value: any) => void;
   folder?: string;
}

export function useUpload({ value, onChange, folder }: UseUploadProps) {
   const fileInputRef = useRef<HTMLInputElement>(null);

   const { mutate: uploadFiles, isPending: isUploading } = useMutation({
      mutationKey: ['upload files', folder],
      mutationFn: (formData: FormData) =>
         fileService.uploadFiles(formData, folder),
      onSuccess(data) {
         const newUrls = data.map((file) => file.url);
         if (Array.isArray(value)) {
            // РЕЖИМ МАССИВА: добавляем новые URL к старым
            onChange([...value, ...newUrls]);
         } else {
            // РЕЖИМ СТРОКИ: берем только первый загруженный файл и возвращаем строкой
            onChange(newUrls[0] || '');
         }
      },
      onError() {
         toast.error('Ошибка при загрузке файлов!');
      },
   });

   const handleFileChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
         const selectedFiles = event.target.files;

         if (selectedFiles && selectedFiles.length > 0) {
            const fileArray = Array.from(selectedFiles);

            const formData = new FormData();
            fileArray.forEach((file) => formData.append('files', file));

            uploadFiles(formData);

            event.target.value = '';
         }
      },
      [uploadFiles],
   );

   const handleButtonClick = useCallback(() => {
      fileInputRef.current?.click();
   }, [fileInputRef]);

   return useMemo(
      () => ({
         handleButtonClick,
         handleFileChange,
         isUploading,
         fileInputRef,
      }),
      [isUploading, handleButtonClick, handleFileChange, fileInputRef],
   );
}
