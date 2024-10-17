import { HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getEmployees } from '@/entities'
import WorkManagementOwnerClient from './WorkManagementOwnerClient'

export default async function WorkManagementOwner({ storeId }: { storeId: string }) {
  const queryClient = new QueryClient()
  queryClient.prefetchQuery({
    queryKey: ['employees', storeId],
    queryFn: () => getEmployees(storeId),
  })
  return (
    <HydrationBoundary queryClient={queryClient}>
      <WorkManagementOwnerClient />
    </HydrationBoundary>
  )
}
