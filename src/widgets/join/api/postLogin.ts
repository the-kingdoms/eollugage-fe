import { axiosInstance } from '@/shared'
//import { UserInfoT } from './user'

export interface LoginInput {
  userId: string
  otp: number
}

interface PostLoginResponse {
  token: string
}

async function postLogin(body: LoginInput): Promise<PostLoginResponse> {
  const { data } = await axiosInstance.post('/v1/login/phone', body)
  return data
}

export { postLogin }
