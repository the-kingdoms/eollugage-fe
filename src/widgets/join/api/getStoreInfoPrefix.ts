import { axiosInstance } from '@/shared'

interface GetStoreInfoPrefixResponse {
  storeId: string
  name: string
  introduction: string
  image: string
  phone: string
  address: string
  openingHour: string
  originalInfo: string
  externalNotice: string
  internalNotice: string
}
async function getStoreInfoPrefix(stordIdPrefix: string): Promise<GetStoreInfoPrefixResponse> {
  const { data } = await axiosInstance.get(`/v1/stores/search/${stordIdPrefix}`)
  return data
}

export { getStoreInfoPrefix }
