import { AttendanceForm } from '@/widgets'

export default function EditAttendancePage({ params }: { params: { id: string } }) {
  const memberID = params.id
  return <AttendanceForm type="edit" defaultMemberId={memberID as string} />
}
