import { useQuery } from '@tanstack/react-query'
import getMembers from '../api/getMembers'
import { Members } from '../types/member'

const useMember = (storeId: string) => {
  const { data: members } = useQuery<Members>({
    queryKey: ['members', storeId],
    queryFn: () => getMembers(storeId),
  })
  return { members }
}
export default useMember
