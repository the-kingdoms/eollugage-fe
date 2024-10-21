import ImageUploadScreen from '@/features/upload-image/ui/UploadImageScreen'

interface HomeUploadImagePageProps {
  params: {
    storeId: string
  }
}

export default function HomeUploadImagePage({ params }: HomeUploadImagePageProps) {
  return <ImageUploadScreen page="home" storeId={params.storeId} />
}
