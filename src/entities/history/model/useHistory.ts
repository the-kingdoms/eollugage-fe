import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import getHistories from '../api/getHistories'
import postHistory from '../api/PostHistory'
import { PostHistory } from '../types/reqBody'

const useHistory = (
  storeId: string,
  memberId?: string,
  type?: 'weekly' | 'monthly',
  year?: number,
  month?: number,
  weekOfMonth?: number,
) => {
  const queryClient = useQueryClient()
  const { data: histories } = useQuery({
    queryKey: ['histories', storeId, memberId, type, year, month, weekOfMonth],
    queryFn: () => getHistories(storeId, memberId, type, year, month, weekOfMonth),
  })

  const { mutate: createHistory } = useMutation({
    mutationFn: ({
      selectedMemberId,
      reqBody,
    }: {
      selectedMemberId: string
      reqBody: PostHistory
    }) => postHistory(storeId, selectedMemberId, reqBody),
    onSuccess: (_, { selectedMemberId }) => {
      queryClient.invalidateQueries({ queryKey: ['histories', selectedMemberId], exact: false })
    },
  })
  return { histories, createHistory }
}
export default useHistory
