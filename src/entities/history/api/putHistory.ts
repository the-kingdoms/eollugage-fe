import { axiosInstance } from '@/shared'
import { PutHistory } from '../types/reqBody'

const putHistory = async (
  storeId: string,
  memberId: string,
  historyId: string,
  reqBody: PutHistory,
) => {
  try {
    const { status, statusText } = await axiosInstance.put(
      `/v1/stores/${storeId}/relations/${memberId}/histories/${historyId}`,
      reqBody,
    )

    if (status !== 200) {
      throw new Error(statusText)
    }
    return true
  } catch (error) {
    return false
  }
}
export default putHistory
