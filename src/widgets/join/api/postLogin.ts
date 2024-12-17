import { axiosInstance } from '@/shared'
//import { UserInfoT } from './user'

export interface LoginInput {
  userId: string
  otp: string
}

interface PostLoginResponse {
  token: string
}

async function postLogin(body: LoginInput): Promise<PostLoginResponse> {
  const loginBody = { uid: body.userId, verificationCode: Number(body.otp) }
  const { data } = await axiosInstance.post('/v1/login/phone', loginBody)
  return data
}

export { postLogin }
