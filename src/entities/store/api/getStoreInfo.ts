import { axiosInstance } from '@/shared'
import { StoreInfoT } from './store'

async function getStoreInfo(storeId: string): Promise<StoreInfoT> {
  const { data } = await axiosInstance.get(`/v1/stores/${storeId}`)
  return data
}

export { getStoreInfo }
