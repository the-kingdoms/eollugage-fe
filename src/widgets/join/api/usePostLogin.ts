import { useMutation } from '@tanstack/react-query'
import { postLogin } from './postLogin'
import { setTokenFromLocalStorage } from '@/shared'
import { UserInfoT } from './user'

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
