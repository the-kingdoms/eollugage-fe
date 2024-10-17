import { axiosInstance } from '@/shared'
import { Employees } from '../types/employee'

const getEmployees = async (storeId: string): Promise<Employees> => {
  const { data } = await axiosInstance.get(`/v1/stores/${storeId}/members`)
  return data
}
export default getEmployees
