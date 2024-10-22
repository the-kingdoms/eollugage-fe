import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getMembers } from '@/entities'
import WorkManagementOwnerClient from './WorkManagementOwnerClient'

export default async function WorkManagementOwner({ storeId }: { storeId: string }) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['members', storeId],
    queryFn: () => getMembers(storeId),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WorkManagementOwnerClient storeId={storeId} />
    </HydrationBoundary>
  )
}
