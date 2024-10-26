import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { setTokenFromCookie } from '@/shared'
import { postLogin } from '../api/postLogin'
import { UserInfoT } from '../api/user'
import { StoreT } from '../api/store'

function usePostLogin(userInfo: UserInfoT, handleStoreListCheck: (storelist: StoreT[]) => void) {
  const { mutate } = useMutation({
    mutationKey: ['postLogin'],
    mutationFn: () => postLogin(userInfo),
    onSuccess: async res => {
      setTokenFromCookie(res.token, 7)

      try {
        const response = await axios.get('/api/v1/my', {
          headers: {
            Authorization: `Bearer ${res.token}`,
          },
        })

        const { storeList } = response.data

        handleStoreListCheck(storeList)
      } catch (error) {
        console.error('Failed to fetch storelist:', error)
      }
    },
  })

  return { mutate }
}

export { usePostLogin }
