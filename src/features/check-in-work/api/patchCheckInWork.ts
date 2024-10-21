'use server'

import { axiosInstance } from '@/shared'

const patchCheckInWork = async (storeId: string, memberId: string) => {
  try {
    const { status, statusText } = await axiosInstance.put(
      `/v1/stores/${storeId}/relations/${memberId}/go-work`,
    )

    if (status !== 200) {
      throw new Error(statusText)
    }
    return true
  } catch (error) {
    return false
  }
}
export default patchCheckInWork
