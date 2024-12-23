import { axiosInstance } from '@/shared'
import { UserInfoT } from './user'

interface PostOTPResponse {
  id: string
  message: string
}

async function postOTP(body: UserInfoT): Promise<PostOTPResponse> {
  const { data } = await axiosInstance.post('/v1/send-verification-code', body)
  return data
}

export { postOTP }
