import { axiosInstance } from '@/shared'
import { getTokenFromLocalStorage } from '@/shared'

async function deleteUser() {
  const token = getTokenFromLocalStorage()

  return await axiosInstance.delete('/v1/members', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export { deleteUser }
