/* eslint-disable @typescript-eslint/no-unused-vars */

import { useMutation } from '@tanstack/react-query'
import patchCheckInWork from '../api/patchCheckInWork'

const useCheckIn = () => {
  const {
    mutate: checkIn,
    status: checkInStatus,
    error: checkInError,
  } = useMutation({
    mutationFn: async ({ storeId, memberId }: { storeId: string | undefined; memberId: string }) =>
      patchCheckInWork(storeId),
  })
  return { checkIn, checkInStatus, checkInError }
}
export default useCheckIn
