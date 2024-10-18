import { useQuery } from '@tanstack/react-query'
import getHistories from '../api/getHistories'

const useHistory = (
  storeId: string,
  memberId: string,
  type: 'weekly' | 'monthly',
  year: number,
  month: number,
  weekOfMonth: number | null,
) => {
  const { data: histories } = useQuery({
    queryKey: ['histories', storeId, memberId, type, year, month, weekOfMonth],
    queryFn: () => getHistories(storeId, memberId, type, year, month, weekOfMonth),
  })
  return { histories }
}
export default useHistory
