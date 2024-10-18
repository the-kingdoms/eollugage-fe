import { useMutation } from '@tanstack/react-query'
import { postStoreInfo } from '../api/postStoreInfo'
import { StoreInfoT } from '@/entities'

function usePostStoreInfo(name: string) {
  const storeInfo: StoreInfoT = {
    name,
    introduction: 'asdf',
    image: 'asdf',
    phone: 'asdf',
    address: 'asdf',
    openingHour: 'asdf',
    originalInfo: '',
    externalNotice: '',
    internalNotice: '',
  }

  const { mutate } = useMutation({
    mutationKey: ['postStoreInfo'],
    mutationFn: () => postStoreInfo(storeInfo),
  })

  return { mutate }
}

export { usePostStoreInfo }
