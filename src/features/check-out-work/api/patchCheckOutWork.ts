'use server'

import { axiosInstance } from '@/shared'

const patchCheckOutWork = async (storeId: string, memberId: string) => {
  const { status, statusText } = await axiosInstance.put(
    `/v1/stores/${storeId}/relations/${memberId}/leave-work`,
  )

  if (status !== 200) {
    throw new Error(statusText)
  }

  return true
}

export default patchCheckOutWork
