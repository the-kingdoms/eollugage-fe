import { AttendanceButtonDialog } from '@/shared'
import useCheckOut from '../model/useCheckOut'

export default function CheckOutWorkButton({
  storeId,
  memberId,
}: {
  storeId: string
  memberId: string
}) {
  const { checkOut, checkOutError, checkOutStatus } = useCheckOut()
  const handleClick = async () => {
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
