import PositionWidget from '@/widgets/mypage/ui/PositionWidget'

export default async function PositionPage({ params }: { params: { storeId: string } }) {
  return <PositionWidget storeId={params.storeId} />
}
