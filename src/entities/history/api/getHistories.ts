import { axiosInstance } from '@/shared'
import { Histories } from '../types/history'

const getHistories = async (
  storeId: string,
  memberId: string,
  type: 'weekly' | 'monthly',
  year: number,
  month: number,
  weekOfMonth: number | null,
): Promise<Histories> => {
  try {
    const { data } = await axiosInstance.get(
      `/v1/stores/${storeId}/relations/${memberId}/histories?year=${year}&month=${month}${type === 'weekly' && `&weekOfMonth=${weekOfMonth}`}`,
    )
    return data
  } catch (e) {
    return {
      storeId,
      memberId,
      type,
      year,
      month,
      weekOfMonth: weekOfMonth || null,
      histories: [],
    }
  }
}
export default getHistories
