import { useMutation } from '@tanstack/react-query'
import { postStoreInfo } from './postStoreInfo'
import { StoreInfoT } from './store'
import { useAtom } from 'jotai'
import { storeIdAtom } from '@/shared'

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
