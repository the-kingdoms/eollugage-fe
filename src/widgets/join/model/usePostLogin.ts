import { useMutation } from '@tanstack/react-query'
import { setTokenFromCookie } from '@/shared'
import { postLogin } from '../api/postLogin'
import { UserInfoT } from '../api/user'

function usePostLogin(userInfo: UserInfoT) {
  const { mutate } = useMutation({
    mutationKey: ['postLogin'],
    mutationFn: () => postLogin(userInfo),
    onSuccess: res => setTokenFromCookie(res.token, 7),
  })

  return { mutate }
}

export { usePostLogin }
