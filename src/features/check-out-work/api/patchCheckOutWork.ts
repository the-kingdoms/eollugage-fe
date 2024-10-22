'use server'

import { axiosServerInstance } from '@/shared'

const patchCheckOutWork = async (storeId: string) => {
  try {
    const { status, statusText } = await axiosServerInstance.patch(`/v1/stores/${storeId}/work/end`)

    if (status !== 200) {
      throw new Error(statusText)
    }
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export default patchCheckOutWork
