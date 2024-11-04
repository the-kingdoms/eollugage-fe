import { getPositions } from '@/features/mypage/api/getPositions'
import { PositionGroupType, PositionItem } from '@/shared/types/myPageTypes'
import PositionWidget from '@/widgets/mypage/ui/PositionWidget'

export default async function PositionPage({ params }: { params: { storeId: string } }) {
  const initialData = await getPositions(params.storeId)

  function groupByPosition(initialPositions: PositionItem[]) {
    const groupedPositions: PositionGroupType[] = initialPositions.reduce<PositionGroupType[]>(
      (acc, item) => {
        const group = acc.find(g => g.position === item.position && g.position !== '사장님')
        if (group) {
          group.items.push(item)
        } else if (item.position !== '사장님' || acc.some(g => g.position === '사장님')) {
          acc.push({ position: item.position, items: [item] })
        }
        return acc
      },
      [],
    )
    return groupedPositions
  }

  const data = groupByPosition(initialData)
  return <PositionWidget storeId={params.storeId} data={data} />
}
