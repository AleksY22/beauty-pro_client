import Link from 'next/link';
import { type PropsWithChildren } from 'react';

import {
   Button,
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui';

import { AuthSocial } from './auth-social';

interface AuthWrapperProps {
   heading: string;
   description?: string;
   backButtonLabel?: string;
   backButtonHref?: string;
   isShowSocial?: boolean;
}

export function AuthWrapper({
   children,
   heading,
   description,
   backButtonLabel,
   backButtonHref,
   isShowSocial = false,
}: PropsWithChildren<AuthWrapperProps>) {
   return (
      <Card className="w-100">
         <CardHeader className="space-y-2">
            <CardTitle className="font-semibold text-xl">{heading}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
         </CardHeader>
         <CardContent>
            {children}
            {isShowSocial && <AuthSocial />}
         </CardContent>
         <CardFooter>
            {backButtonLabel && backButtonHref && (
               <Button variant="link" className="w-full font-normal">
                  <Link href={backButtonHref}>{backButtonLabel}</Link>
               </Button>
            )}
         </CardFooter>
      </Card>
   );
}
