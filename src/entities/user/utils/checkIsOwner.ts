import { UserInfo } from '../types/user'

export const checkIsOwner = (userInfo: UserInfo) => {
  if (userInfo.relationDTO.role === 'OWNER') return true
  return false
}
