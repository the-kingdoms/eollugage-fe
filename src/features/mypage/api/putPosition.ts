import { axiosInstance } from '@/shared'

async function putPosition(storeId: string, memberId: string) {
  return await axiosInstance.put(`/v1/stores/${storeId}/relations/${memberId}`)
}

export { putPosition }
