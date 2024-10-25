import { AttendanceButtonDialog } from '@/shared'
import useCheckOut from '../model/useCheckOut'
import { useWorkStatus } from '@/entities'

export default function CheckOutWorkButton({ storeId }: { storeId: string }) {
  const { workStatus } = useWorkStatus(storeId)
  const { checkOut, checkOutError, checkOutStatus } = useCheckOut()
  const handleClick = async () => {
    checkOut({ storeId })
  }
  return (
    <AttendanceButtonDialog
      buttonText="퇴근"
      onClick={handleClick}
      status={checkOutStatus}
      error={checkOutError}
      disabled={workStatus === 'end-working' || workStatus === 'not-working' || workStatus === null}
    />
  )
}
