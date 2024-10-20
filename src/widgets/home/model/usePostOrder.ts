import { useMutation } from '@tanstack/react-query'
import { postOrder, GetOrderT } from '../api/postOrder'

function usePostOrder(order: GetOrderT, storeId: string) {
  const { mutate } = useMutation({
    mutationKey: ['postOrder'],
    mutationFn: () => postOrder(order, storeId),
  })

  return { mutate }
}

export { usePostOrder }
