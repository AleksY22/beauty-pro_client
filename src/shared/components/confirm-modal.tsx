import { PropsWithChildren } from 'react';

import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from './ui/alert-dialog';

interface ConfirmModalProps {
   handleClick: () => void;
   open?: boolean;
   onOpenChange?: (open: boolean) => void;
}

export function ConfirmModal({
   handleClick,
   children,
   open,
   onOpenChange,
}: PropsWithChildren<ConfirmModalProps>) {
   return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
         {children && (
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
         )}
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
               <AlertDialogDescription>
                  Это действие нельзя будет отменить!
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Отмена</AlertDialogCancel>
               <AlertDialogAction
                  onClick={() => handleClick()}
                  variant="default"
               >
                  Продолжить
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
