import { getStoreInfo } from '@/entities/store/api/getStoreInfo'
import ImageUploadScreen from '@/features/upload-image/ui/UploadImageScreen'

interface HomeUploadImagePageProps {
  params: {
    storeId: string
  }
}

export default async function HomeUploadImagePage({ params }: HomeUploadImagePageProps) {
  const { image } = await getStoreInfo(params.storeId)

  return <ImageUploadScreen storeId={params.storeId} initialImageName={image} />
}
