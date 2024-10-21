import { axiosInstance } from '@/shared'

async function postPosition(storeId: string, memberId: string) {
  return axiosInstance.post(`/v1/stores/${storeId}/relations/${memberId}`)
}

export { postPosition }
