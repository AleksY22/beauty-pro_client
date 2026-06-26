import { useQuery } from '@tanstack/react-query';

import { userService } from '@/features/user/services/user.service';

export function useProfile() {
   const { data: user, isLoading } = useQuery({
      queryKey: ['profile'],
      queryFn: () => userService.getProfile(),
      //enabled: hasSession,
      // retry: false,
   });

   return { user, isLoading };
}
