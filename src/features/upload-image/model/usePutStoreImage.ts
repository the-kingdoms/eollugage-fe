import { useMutation } from '@tanstack/react-query'
import { setTokenFromLocalStorage, storeIdAtom } from '@/shared'
import { StoreInfoT, putStoreInfo, useGetStoreInfo } from '@/entities'
import { useAtom } from 'jotai'
import React, { SetStateAction } from 'react'

interface usePutStoreImageParams {
  setIsLoading: React.Dispatch<SetStateAction<boolean>>
  storeInfo: StoreInfoT
}

function usePutStoreImage(
  imageName: string | undefined,
  { setIsLoading, storeInfo }: usePutStoreImageParams,
) {
  const [storeId] = useAtom(storeIdAtom)
  let newStoreInfo = storeInfo as StoreInfoT
  if (imageName) newStoreInfo.image = imageName

  const { mutate } = useMutation({
    mutationKey: ['putStoreInfo', storeId],
    mutationFn: () => putStoreInfo(newStoreInfo, storeId),
    onSettled: () => setIsLoading(false),
  })

  return { mutate }
}

export { usePutStoreImage }
