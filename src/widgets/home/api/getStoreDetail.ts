import { StoreInfoT } from '@/entities'
import { axiosInstance } from '@/shared'

interface GetStoreDetailResponse extends StoreInfoT {
  storeId: string
}

async function getStoreDetail(storeId: string): Promise<GetStoreDetailResponse> {
  const { data } = await axiosInstance.get(`/v1/stores/${storeId}`)
  return data
}

export { getStoreDetail }
