import { useMutation } from '@tanstack/react-query'
import { setTokenFromCookie } from '@/shared'
import { postLogin } from '../api/postLogin'
import { UserInfoT } from '../api/user'
import { sendTokenToRN } from '../utils/sendTokenToRN'

function usePostLogin(userInfo: UserInfoT) {
  const { mutate } = useMutation({
    mutationKey: ['postLogin'],
    mutationFn: () => postLogin(userInfo),
    onSuccess: res => {
      sendTokenToRN(res.token)
      setTokenFromCookie(res.token, 7)
    },
  })

  return { mutate }
}

export { usePostLogin }
