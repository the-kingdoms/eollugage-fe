/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import patchCheckOutWork from '../api/patchCheckOutWork'

const useCheckOut = () => {
  const queryClient = useQueryClient()

  const {
    mutate: checkOut,
    status: checkOutStatus,
    error: checkOutError,
  } = useMutation({
    mutationFn: async ({ storeId }: { storeId: string }) => patchCheckOutWork(storeId),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['histories'] })
      queryClient.setQueryData(['workStatus'], () => {
        return 'end-working'
      })
    },
  })
  return { checkOut, checkOutStatus, checkOutError }
}
export default useCheckOut
