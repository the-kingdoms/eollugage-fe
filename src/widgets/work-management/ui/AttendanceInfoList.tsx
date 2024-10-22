'use client'

/* eslint-disable arrow-parens */

import { useHistory } from '@/entities'

import AttendanceInfoItem from './AttendanceInfoItem'
import useAttendance from '../hooks/useAttendance'

export default function AttendanceInfoList({ storeId }: { storeId: string }) {
  const { memberId, type, yearMONTHLY, yearWEEKLY, monthMONTHLY, monthWEEKLY, weekOfMonthWEEKLY } =
    useAttendance()

  const { histories } = useHistory(
    storeId,
    memberId,
    type,
    type === 'WEEKLY' ? yearWEEKLY : yearMONTHLY,
    type === 'WEEKLY' ? monthWEEKLY : monthMONTHLY,
    type === 'WEEKLY' ? weekOfMonthWEEKLY : 0,
  )
  console.log(histories)
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
