import { useMutation } from '@tanstack/react-query'
import { setTokenFromLocalStorage } from '@/shared'
import { postLogin } from '../api/postLogin'
import { UserInfoT } from '../api/user'

function usePostLogin(userInfo: UserInfoT) {
  const { mutate } = useMutation({
    mutationKey: ['postLogin'],
    mutationFn: () => postLogin(userInfo),
    onSuccess: res => {
      setTokenFromLocalStorage(res.token)
    },
  })

  return { mutate }
}

export { usePostLogin }
