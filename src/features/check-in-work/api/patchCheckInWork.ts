'use server'

import { axiosServerInstance } from '@/shared'

const patchCheckInWork = async (storeId: string | undefined) => {
  if (!storeId) return false
  try {
    const { status, statusText } = await axiosServerInstance.patch(
      `/v1/stores/${storeId}/work/start`,
    )

    if (status !== 200) {
      throw new Error(statusText)
    }
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
export default patchCheckInWork
