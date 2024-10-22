import { useUser } from '@/entities'
import { AttendanceButtonDialog } from '@/shared'
import useCheckIn from '../model/useCheckIn'

export default function CheckInWorkButton({ memberId }: { memberId: string | null }) {
  const { userInfo } = useUser()
  const { checkIn, checkInStatus, checkInError } = useCheckIn()
  const handleClick = async () => {
    if (!memberId) return
    checkIn({ storeId: userInfo?.storeId, memberId })
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
