import AttendanceInfoList from './AttendanceInfoList'
import DateController from './DateController'

export default function AttendanceInfo({
  storeId,
  memberId,
}: {
  storeId: string
  memberId: string
}) {
  return (
    <div>
      <DateController />
      <div className="w-full h-[1px] bg-[#E0E0E0]" />
      <AttendanceInfoList storeId={storeId} memberId={memberId} />
    </div>
  )
}
