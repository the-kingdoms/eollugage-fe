import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { deleteUser } from '../api/deleteUser'

function useDeleteUser() {
  const { push } = useRouter()
  const { mutate } = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: () => deleteUser(),
    onError: error => {
      console.log('사용자 계정을 삭제하는 중 오류가 발생했습니다', error)
    },
    onSuccess: () => {
      console.log('탈퇴 성공')
      push('/')
    },
  })
  return { mutate }
}

export { useDeleteUser }
