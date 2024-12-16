import { useMutation } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { postOTP } from '../api/postOTP'
import { UserInfoT } from '../api/user'
import { uid } from '@/widgets/join/atoms/joinAtoms'

function usePostOTP(
  userInfo: UserInfoT,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) {
  const [, setUid] = useAtom(uid)
  const { mutate } = useMutation({
    mutationKey: ['postOTP'],
    mutationFn: () => postOTP(userInfo),
    onSuccess: async res => {
      const { id } = res
      setUid(id)
    },
    onError: error => {
      console.log(error)
    },
  })

  return { mutate }
}

export { usePostOTP }
