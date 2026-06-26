import { toast } from 'sonner';

export function toastMessageHandler(error: Error) {
   if (error.message) {
      const errorMessage = error.message;
      const firstDotIndex = errorMessage.indexOf('.');

      if (firstDotIndex !== -1) {
         toast.info(errorMessage.slice(0, firstDotIndex), {
            description: errorMessage.slice(firstDotIndex + 1),
         });
      } else {
         toast.info(errorMessage);
      }
   } else {
      toast.info('Ошибка со стороны сервера');
   }
}
