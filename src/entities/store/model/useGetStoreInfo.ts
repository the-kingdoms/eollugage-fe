import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getStoreInfo } from '../api/getStoreInfo'

export function useGetStoreInfo(storeId: string) {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['getStoreInfo', storeId],
    queryFn: () => getStoreInfo(storeId),
  })

  const prefetchStoreInfo = () => {
    queryClient.prefetchQuery({
      queryKey: ['getStoreInfo', storeId],
      queryFn: () => getStoreInfo(storeId),
    })
  }

  return { data, prefetchStoreInfo }
}
