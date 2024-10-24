import { useQuery } from '@tanstack/react-query'
import { getImageFromS3 } from '../api/getStoreImage'

export function useGetStoreImage(storeId: string, fileFullName: string | undefined) {
  const { data, isLoading } = useQuery({
    queryKey: ['getStoreImage', storeId],
    queryFn: () => getImageFromS3(fileFullName as string),
    enabled: typeof fileFullName === 'string',
  })
  return { data, isLoading }
}
