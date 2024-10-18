import { useMutation } from '@tanstack/react-query'
import { storeIdAtom } from '@/shared'
import { useAtom } from 'jotai'
import { postStoreInfo } from '../api/postStoreInfo'
import { StoreInfoT } from '@/entities'

function usePostStoreInfo(name: string) {
  const [, setStoreId] = useAtom(storeIdAtom)

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
    onSuccess: res => {
      setStoreId(res.id)
    },
  })

  return { mutate }
}

export { usePostStoreInfo }
