import { axiosInstance } from '@/shared'

async function getAccountInfo() {
  const { data } = await axiosInstance.get(`/v1/my`)
  return data
}

export { getAccountInfo }
