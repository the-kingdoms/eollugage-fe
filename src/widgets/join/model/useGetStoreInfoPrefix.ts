import { useMutation } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { isValidCodeAtom, storeNameAtom } from '@/shared/atoms/globalAtom'
import { getStoreInfoPrefix } from '../api/getStoreInfoPrefix'

function useGetStoreInfoPrefix(stordIdPrefix: string) {
  const [, setStoreName] = useAtom(storeNameAtom)
  const [, setIsValidCode] = useAtom(isValidCodeAtom)
  const { mutate } = useMutation({
    mutationKey: ['getStoreInfoPrefix', stordIdPrefix],
    mutationFn: () => getStoreInfoPrefix(stordIdPrefix),
    onSuccess: res => {
      setIsValidCode(true)
      setStoreName(res.name)
    },
    onError: () => {
      setIsValidCode(false)
    },
  })

  return { mutate }
}

export { useGetStoreInfoPrefix }
