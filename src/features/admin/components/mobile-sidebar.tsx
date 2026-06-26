import { Menu } from 'lucide-react';

import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from '@/shared/components/ui/sheet';

import { Sidebar } from './sidebar';

export function MobileSidebar() {
   return (
      <Sheet>
         <SheetTrigger className="lg:hidden pr-4 hover:opacity-75">
            <Menu />
         </SheetTrigger>
         <SheetContent side="left" className="p-0">
            <SheetHeader aria-describedby={undefined}>
               <SheetTitle aria-describedby={undefined} />
               <SheetDescription aria-describedby={undefined} />
            </SheetHeader>
            <Sidebar />
         </SheetContent>
      </Sheet>
   );
}
