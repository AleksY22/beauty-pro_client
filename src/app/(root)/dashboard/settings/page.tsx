import { type Metadata } from 'next';

import { SettingsForm } from '@/features/user/components';

export const metadata: Metadata = {
   title: 'Настройки профиля',
};

export default function SettingsPage() {
   return (
      <div className="flex flex-col items-center justify-center mb-5">
         <SettingsForm />
      </div>
   );
}
