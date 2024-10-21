import { AttendanceButtonDialog } from '@/shared'
import useCheckIn from '../model/useCheckIn'

export default function CheckInWorkButton({
  storeId,
  memberId,
}: {
  storeId: string
  memberId: string | null
}) {
  const { checkIn, checkInStatus, checkInError } = useCheckIn()
  const handleClick = async () => {
    if (!memberId) return
    checkIn({ storeId, memberId })
  }
  return (
    <AttendanceButtonDialog
      buttonText="출근"
      onClick={handleClick}
      status={checkInStatus}
      error={checkInError}
    />
  )
}
