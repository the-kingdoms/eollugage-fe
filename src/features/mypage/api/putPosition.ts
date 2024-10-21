import { axiosInstance, getTokenFromLocalStorage } from '@/shared'

async function putPosition(storeId: string, memberId: string, position: string) {
  const token = getTokenFromLocalStorage()
  return axiosInstance.put(
    `/v1/stores/${storeId}/relations/${memberId}`,
    {
      role: 'OWNER',
      position: position,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}

export { putPosition }
