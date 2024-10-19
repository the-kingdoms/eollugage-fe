import { History } from '@/entities'
import { useQueryClient } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import Link from 'next/link'
import { selectedMemberAtom } from '../atoms/workManagementAtoms'

export default function AttendanceInfoItem({ item, storeId }: { item: History; storeId: string }) {
  const queryClient = useQueryClient()
  const selectedMemberId = useAtomValue(selectedMemberAtom)
  return (
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
      <p className="body-03-medium-compact">{item.date}</p>
      <p className="body-03-regular-compact text-[#6F6F6F]">
        {item.startTime} - {item.endTime}
      </p>
    </Link>
  )
}
