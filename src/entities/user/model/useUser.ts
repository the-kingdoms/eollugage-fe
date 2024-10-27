import { useQuery } from '@tanstack/react-query'
import fetchUserInfo from '../api/fetchUserInfo'

const useUser = () => {
  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => fetchUserInfo(),
  })
  return { userInfo }
}
export default useUser
