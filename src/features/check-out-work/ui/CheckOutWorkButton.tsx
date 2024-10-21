import { AttendanceButtonDialog } from '@/shared'
import useCheckOut from '../model/useCheckOut'

export default function CheckOutWorkButton({
  storeId,
  memberId,
}: {
  storeId: string
  memberId: string | null
}) {
  const { checkOut, checkOutError, checkOutStatus } = useCheckOut()
  const handleClick = async () => {
    if (!memberId) return
    checkOut({ storeId, memberId })
  }
  return (
    <AttendanceButtonDialog
      buttonText="퇴근"
      onClick={handleClick}
      status={checkOutStatus}
      error={checkOutError}
    />
  )
}
