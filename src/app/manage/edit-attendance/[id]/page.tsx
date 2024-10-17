import { AttendanceForm } from '@/widgets'

export default function EditAttendancePage({ params }: { params: { id: string } }) {
  const employeeID = params.id
  return <AttendanceForm type="edit" defaultEmployeeId={employeeID as string} />
}
