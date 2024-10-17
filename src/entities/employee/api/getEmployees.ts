import { axiosInstance } from '@/shared'

const getEmployees = async (storeId: string) => {
  const { data } = await axiosInstance.get(`/v1/stores/${storeId}/members`)
  return data
}
export default getEmployees
