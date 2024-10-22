import AttendanceInfoList from './AttendanceInfoList'
import DateController from './DateController'

export default function AttendanceInfo({ storeId }: { storeId: string }) {
  return (
    <div>
      <DateController />
      <div className="w-full h-[1px] bg-[#E0E0E0]" />
      <AttendanceInfoList storeId={storeId} />
    </div>
  )
}
