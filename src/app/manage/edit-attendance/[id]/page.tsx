import { AttendanceForm } from '@/widgets'

export default function EditAttendancePage({ params }: { params: { id: string } }) {
  const workerID = params.id
  return <AttendanceForm type="edit" defaultWorkerId={workerID as string} />
}
