import { storeIdAtom } from '@/shared'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { getImageFromS3 } from '../api/getStoreImage'

function useGetStoreImage(fileFullName: string) {
  const [storeId] = useAtom(storeIdAtom)
  const { data } = useQuery({
    queryKey: ['getStoreImage', storeId],
    queryFn: () => getImageFromS3(fileFullName),
  })
}
