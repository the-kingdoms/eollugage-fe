import { getPositions } from '@/features/mypage/api/getPositions'
import PositionWidget from '@/widgets/mypage/ui/PositionWidget'

export default async function PositionPage({ params }: { params: { storeId: string } }) {
  const data = await getPositions(params.storeId)
  return <PositionWidget storeId={params.storeId} initialData={data} />
}
