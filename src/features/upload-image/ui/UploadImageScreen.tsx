import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import ImageUploadClient from './UploadImageClient'
import { getPresignedUrl } from '../api/getPresignedURL'


interface ImageUploadScreenProps {
  storeId: string
  initialImageName: string
}

export default async function ImageUploadScreen({
  storeId,
  initialImageName,
}: ImageUploadScreenProps) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['getPresignedURL', storeId, initialImageName],
    queryFn: () => getPresignedUrl(initialImageName),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ImageUploadClient page="home" storeId={storeId} initialImageName={initialImageName} />
    </HydrationBoundary>
  )
}
