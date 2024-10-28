import { axiosServerInstance } from '@/shared'

async function getMy() {
  const { data } = await axiosServerInstance.get(`v1/my`)
  return data
}

export { getMy }