import { HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getMembers } from '@/entities'
import WorkManagementOwnerClient from './WorkManagementOwnerClient'

export default function WorkManagementOwner({ storeId }: { storeId: string }) {
  const queryClient = new QueryClient()
  queryClient.prefetchQuery({
    queryKey: ['members', storeId],
    queryFn: () => getMembers(storeId),
  })
  return (
    <HydrationBoundary queryClient={queryClient}>
      <WorkManagementOwnerClient storeId={storeId} />
    </HydrationBoundary>
  )
}
