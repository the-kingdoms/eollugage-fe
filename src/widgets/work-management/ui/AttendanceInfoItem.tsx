import Link from 'next/link'

export interface AttendanceItem {
  id: string
  date: string
  time: string
}

export default function AttendanceInfoItem({ item }: { item: AttendanceItem }) {
  return (
    <Link
      href={`/manage/edit-attendance/${item.id}`}
      className="flex justify-between w-full items-center py-4"
    >
      <p className="body-03-medium-compact">{item.date}</p>
      <p className="body-03-regular-compact text-[#6F6F6F]">{item.time}</p>
    </Link>
  )
}
