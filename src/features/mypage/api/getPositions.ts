import { axiosInstance } from '@/shared'
import { getTokenFromLocalStorage } from '@/shared'
import { PositionItem } from '@/shared/types/myPageTypes'

async function getPositions(storeId: string): Promise<PositionItem[]> {
  const token = getTokenFromLocalStorage()
  const { data } = await axiosInstance.get(`v1/stores/${storeId}/relations/members`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (data.ok) {
    return data
  } else {
    console.log(data)
    return []
  }
}

export { getPositions }
