import { useMutation, useQueryClient } from '@tanstack/react-query'
import { StoreInfoT, storeInfoAtom } from '@/entities'
import { useAtom } from 'jotai'
import { putStoreDetail } from '../api/putStoreDetail'

function usePutStoreDetail(notice: string, storeId: string) {
  const [storeInfo] = useAtom(storeInfoAtom)
  const queryClient = useQueryClient()

  const newStoreInfo: StoreInfoT = { ...storeInfo }
  newStoreInfo.internalNotice = notice

  const { mutate } = useMutation({
    mutationKey: ['putStoreDetail', storeId],
    mutationFn: () => putStoreDetail(newStoreInfo, storeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getStoreInfo', storeId] })
    },
  })

  return { mutate }
}

export { usePutStoreDetail }
