import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { axiosInstance, setTokenFromCookie } from '@/shared'
import { postLogin } from '../api/postLogin'
import { UserInfoT } from '../api/user'
import { StoreT } from '../api/store'
import { useGetAccountInfo } from './useGetAccountInfo'

function usePostLogin(userInfo: UserInfoT) {
  const { mutate } = useMutation({
    mutationKey: ['postLogin'],
    mutationFn: () => postLogin(userInfo),
    onSuccess: res => setTokenFromCookie(res.token, 7),
  })

  return { mutate }
}

export { usePostLogin }
