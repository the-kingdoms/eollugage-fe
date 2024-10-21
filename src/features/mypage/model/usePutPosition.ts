import { useMutation } from '@tanstack/react-query'
import { putPosition } from '../api/putPosition'

function usePutPosition() {
  const { mutate } = useMutation({
    mutationKey: ['putPostiion'],
    mutationFn: ({ storeId, memberId }: { storeId: string; memberId: string }) =>
      putPosition(storeId, memberId),
  })
  return mutate
}

export { usePutPosition }
