import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { deleteUser } from '../api/deleteUser'

function useDeleteUser() {
  const { push } = useRouter()
  const { mutate } = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      push('/')
    },
  })
  return { mutate }
}

export { useDeleteUser }
