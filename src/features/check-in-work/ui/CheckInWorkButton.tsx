import { AttendanceButtonDialog } from '@/shared'
import useCheckIn from '../model/useCheckIn'
import { useWorkStatus } from '@/entities'

export default function CheckInWorkButton({ storeId }: { storeId: string }) {
  const { workStatus } = useWorkStatus(storeId)
  console.log(workStatus)
  const { checkIn, checkInStatus, checkInError } = useCheckIn()
  const handleClick = async () => {
    checkIn({ storeId })
    console.log(workStatus)
  }
  return (
    <AttendanceButtonDialog
      buttonText="출근"
      onClick={handleClick}
      status={checkInStatus}
      error={checkInError}
      disabled={
        workStatus === 'end-working' || workStatus === 'start-working' || workStatus === null
      }
    />
  )
}
