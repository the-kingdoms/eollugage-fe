import { getStoreInfo } from '@/entities/store/api/getStoreInfo'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { StoreInfoT } from '@/entities'
import HomeWidgetClient from './HomeWidgetClient'

interface HomeWidgetServerProps {
  storeId: string
}

export async function HomeWidgetServer({ storeId }: HomeWidgetServerProps) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['getStoreInfo', storeId],
    queryFn: () => getStoreInfo(storeId),
  })
  const storeInfo = queryClient.getQueryData(['getStoreInfo', storeId]) as StoreInfoT

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeWidgetClient storeId={storeId} initialStoreInfo={storeInfo} />
    </HydrationBoundary>
  )
}

export default HomeWidgetServer
