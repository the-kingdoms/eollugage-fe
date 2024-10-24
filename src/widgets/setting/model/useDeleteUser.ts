import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { deleteUser } from '../api/deleteUser'

function useDeleteUser() {
  const { replace } = useRouter()
  const { mutate } = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      replace('/')
    },
  })
  return { mutate }
}

export { useDeleteUser }
