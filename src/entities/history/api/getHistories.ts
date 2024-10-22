'use server'

import { axiosInstance } from '@/shared'
import { Histories } from '../types/history'

const getHistories = async (
  storeId: string | null,
  memberId?: string | null,
  type?: 'weekly' | 'monthly',
  year?: number,
  month?: number,
  weekOfMonth?: number | null,
): Promise<Histories> => {
  try {
    if (!storeId || !memberId || !type) throw new Error('storeId, memberId는 필수입니다.')
    console.log(
      `/v1/stores/${storeId}/members/${memberId}/histories?year=${year}&month=${month}${type === 'weekly' ? `&week=${weekOfMonth}` : ''}`,
    )
    const { data } = await axiosInstance.get(
      `/v1/stores/${storeId}/members/${memberId}/histories?year=${year}&month=${month}${type === 'weekly' ? `&week=${weekOfMonth}` : ''}`,
    )

    return data
  } catch (e) {
    return {
      storeId: storeId || '',
      memberId: memberId || null,
      type: type || 'weekly',
      year: year || 0,
      month: month || 0,
      weekOfMonth: weekOfMonth || 0,
      histories: [],
    }
  }
}
export default getHistories
