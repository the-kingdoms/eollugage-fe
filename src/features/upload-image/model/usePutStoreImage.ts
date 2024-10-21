import { useMutation } from '@tanstack/react-query'
import { StoreInfoT, putStoreInfo } from '@/entities'

function usePutStoreImage(
  imageName: string | undefined,
  storeInfo: StoreInfoT | undefined,
  storeId: string,
) {
  const newStoreInfo = storeInfo as StoreInfoT
  if (imageName) newStoreInfo.image = imageName

  const { mutate } = useMutation({
    mutationKey: ['putStoreInfo', storeInfo],
    mutationFn: () => putStoreInfo(newStoreInfo, storeId),
  })

  return { mutate }
}

export { usePutStoreImage }
