'use server'

import { axiosInstance } from '@/shared'
import { Members } from '../types/member'

const getMembers = async (storeId: string): Promise<Members> => {
  try {
    const { data } = await axiosInstance.get(`/v1/stores/${storeId}/members`)
    return data
  } catch (e) {
    return []
  }
}
export default getMembers
