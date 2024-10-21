import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { storeIdAtom } from '@/shared'
import { getStoreInfo } from '../api/getStoreInfo'

export function useGetStoreInfo() {
  const [storeId] = useAtom(storeIdAtom)
  const { data } = useQuery({
    queryKey: ['getStoreInfo', storeId],
    queryFn: () => getStoreInfo(storeId),
  })

  return { data }
}
