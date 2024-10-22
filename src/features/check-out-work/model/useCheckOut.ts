/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation } from '@tanstack/react-query'
import patchCheckOutWork from '../api/patchCheckOutWork'

const useCheckOut = () => {
  const {
    mutate: checkOut,
    status: checkOutStatus,
    error: checkOutError,
  } = useMutation({
    mutationFn: async ({ storeId, memberId }: { storeId: string; memberId: string }) =>
      patchCheckOutWork(storeId),
  })
  return { checkOut, checkOutStatus, checkOutError }
}
export default useCheckOut
