import { useMutation } from '@tanstack/react-query'
import { deleteUser } from '../api/deleteUser'

function useDeleteUser() {
  const { mutate } = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: () => deleteUser(),
    onError: error => {
      console.log('사용자 계정을 삭제하는 중 오류가 발생했습니다', error)
    },
  })
  return mutate
}

export { useDeleteUser }
