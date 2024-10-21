import { useMutation } from '@tanstack/react-query'
import { postPosition } from '../api/postPosition'

function usePostPosition() {
  const { mutate } = useMutation({
    mutationKey: ['postPostiion'],
    mutationFn: ({ storeId, memberId }: { storeId: string; memberId: string }) =>
      postPosition(storeId, memberId),
  })
  return mutate
}

export { usePostPosition }
