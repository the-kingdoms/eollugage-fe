/* eslint-disable arrow-parens */

import { useHistory } from '@/entities'

import AttendanceInfoItem from './AttendanceInfoItem'
import useAttendance from '../hooks/useAttendance'

export default function AttendanceInfoList() {
  const {
    storeId,
    memberId,
    type,
    yearMonthly,
    yearWeekly,
    monthMonthly,
    monthWeekly,
    weekOfMonthWeekly,
  } = useAttendance()
  const { histories } = useHistory(
    storeId,
    memberId,
    type,
    type === 'weekly' ? yearWeekly : yearMonthly,
    type === 'weekly' ? monthWeekly : monthMonthly,
    type === 'weekly' ? weekOfMonthWeekly : 0,
  )

  if (histories?.histories.length === 0) {
    return (
      <div className="w-full pt-[120px] flex items-center justify-center">
        <p className="text-[##6F6F6F] body-02-medium">근무 정보가 아직 없어요</p>
      </div>
    )
  }
  return (
    <div className="px-[16px]">
      {histories?.histories?.map(item => <AttendanceInfoItem item={item} key={item.id} />)}
    </div>
  )
}
