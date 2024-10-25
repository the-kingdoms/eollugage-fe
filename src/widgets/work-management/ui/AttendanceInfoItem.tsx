import { History } from '@/entities'
import { useQueryClient } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import Link from 'next/link'
import { format } from 'date-fns'
import { selectedMemberAtom } from '../atoms/workManagementAtoms'

export default function AttendanceInfoItem({
  item,
  storeId,
  isOwner,
}: {
  item: History
  storeId: string
  isOwner: boolean
}) {
  const queryClient = useQueryClient()
  const selectedMemberId = useAtomValue(selectedMemberAtom)

  return isOwner ? (
    <Link
      href={`/${storeId}/manage/edit-attendance/${item.id}`}
      onClick={async () => {
        await queryClient.prefetchQuery({
          queryKey: ['history', item.id],
          queryFn: () => ({ ...item, memberId: selectedMemberId }),
        })
      }}
      className="flex justify-between w-full items-center py-4"
    >
      <p className="body-03-medium-compact">
        {format(new Date(item.date), 'MM월 dd일')} ({item.day})
      </p>
      <p className="body-03-regular-compact text-[#6F6F6F]">
        {item.startTime} - {item.endTime}
      </p>
    </Link>
  ) : (
    <article className="flex justify-between w-full items-center py-4">
      <p className="body-03-medium-compact">
        {format(new Date(item.date), 'MM월 dd일')} ({item.day})
      </p>
      <p className="body-03-regular-compact text-[#6F6F6F]">
        {item.startTime} - {item.endTime}
      </p>
    </article>
  )
}
