import { useMutation } from '@tanstack/react-query'
import { StoreInfoT } from '@/entities'
import { storeNameAtom } from '@/shared/atoms/globalAtom'
import { useAtom } from 'jotai'
import { putStoreDetail } from '../api/putStoreDetail'

function usePutStoreDetail(notice: string, storeId: string) {
  const [storeName] = useAtom(storeNameAtom)

  const storeInfo: StoreInfoT = {
    name: storeName,
    introduction: 'asdf',
    image: 'asdf', // image api 작업 머지 후 수정
    phone: 'asdf',
    address: 'asdf',
    openingHour: 'asdf',
    originalInfo: 'asdf',
    externalNotice: 'asdf',
    internalNotice: notice,
  }

  const { mutate } = useMutation({
    mutationKey: ['putStoreDetail'],
    mutationFn: () => putStoreDetail(storeInfo, storeId),
  })

  return { mutate }
}

export { usePutStoreDetail }
