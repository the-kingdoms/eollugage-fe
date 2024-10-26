import HomeWidget from '@/widgets/home/ui/HomeWidget'

interface HomePageProps {
  params: {
    storeId: string
  }
}

export default function HomePage({ params }: HomePageProps) {
  return <HomeWidget storeId={params.storeId} />
}
