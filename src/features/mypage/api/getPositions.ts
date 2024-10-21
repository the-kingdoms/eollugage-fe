import { axiosInstance } from '@/shared'
import { PositionItem } from '@/shared/types/myPageTypes'

async function getPositions(storeId: string): Promise<PositionItem[]> {
  const { data } = await axiosInstance.get(`v1/stores/${storeId}/relations/members`)
  return data
}

export { getPositions }
