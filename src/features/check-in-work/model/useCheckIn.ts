import { useMutation } from '@tanstack/react-query'
import patchCheckInWork from '../api/patchCheckInWork'

const useCheckIn = () => {
  const {
    mutate: checkIn,
    status: checkInStatus,
    error: checkInError,
  } = useMutation({
    mutationFn: async ({ storeId, memberId }: { storeId: string | undefined; memberId: string }) =>
      patchCheckInWork(storeId, memberId),
  })
  return { checkIn, checkInStatus, checkInError }
}
export default useCheckIn
