import { useMutation, useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { isValidCodeAtom, storeNameAtom } from '@/shared/atoms/globalAtom'
import { getStoreInfoPrefix } from '../api/getStoreInfoPrefix'
import { getAccountInfo } from '../api/getAccountInfo'
import { getTokenFromCookie } from '@/shared'

function useGetAccountInfo() {
  const { data } = useQuery({
    queryKey: ['getAccountInfo'],
    queryFn: () => getAccountInfo(),
    enabled: getTokenFromCookie() !== null,
  })

  return { data }
}

export { useGetAccountInfo }
