import { useMutation } from '@tanstack/react-query'
import { setTokenFromLocalStorage, storeIdAtom } from '@/shared'
import { StoreInfoT, putStoreInfo, useGetStoreInfo } from '@/entities'
import { useAtom } from 'jotai'
import React, { SetStateAction } from 'react'

function usePutStoreImage(fileFullName: string | undefined) {
  const [storeId] = useAtom(storeIdAtom)
  const { data: storeInfo } = useGetStoreInfo()
  let newStoreInfo = storeInfo as StoreInfoT
  if (fileFullName) newStoreInfo.image = fileFullName

  const { mutate } = useMutation({
    mutationKey: ['putStoreInfo', storeId],
    mutationFn: () => putStoreInfo(newStoreInfo, storeId),
  })

  return { mutate }
}

export { usePutStoreImage }
