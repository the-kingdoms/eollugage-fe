import { axiosInstance, getTokenFromLocalStorage } from '@/shared'

async function deleteUser() {
  const token = getTokenFromLocalStorage()

  return axiosInstance.delete('/v1/members', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export { deleteUser }
