import { AttendanceForm } from '@/widgets'

export default function EditAttendancePage({ params }: { params: { id: string } }) {
  const historyId = params.id
  return <AttendanceForm type="edit" historyId={historyId as string} />
}
