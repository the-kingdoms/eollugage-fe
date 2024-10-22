/* eslint-disable import/no-cycle */
import { getWeekOfMonth } from '@/shared'
import { Icon } from '@eolluga/eolluga-ui'
import { useRef } from 'react'
import handleNext from '../utils/handleNext'
import useAttendance from '../hooks/useAttendance'

interface Today {
  month: number
  weekOfMonth: number
  monthOfWeekOfMonth: number
}
export default function NextButton() {
  const todayRef = useRef<Today>({
    month: new Date().getMonth() + 1,
    weekOfMonth: getWeekOfMonth(new Date()).weekOfMonth,
    monthOfWeekOfMonth: getWeekOfMonth(new Date()).month,
  })
  const {
    type,
    monthMONTHLY,
    monthWEEKLY,
    yearMONTHLY,
    yearWEEKLY,
    weekOfMonthWEEKLY,
    setMonthMONTHLY,
    setMonthWEEKLY,
    setWeekOfMonthWEEKLY,
    setYearMONTHLY,
    setYearWEEKLY,
  } = useAttendance()

  return (
    <button
      type="button"
      onClick={() =>
        handleNext(
          type,
          monthMONTHLY,
          monthWEEKLY,
          yearMONTHLY,
          yearWEEKLY,
          weekOfMonthWEEKLY,
          setYearMONTHLY,
          setMonthMONTHLY,
          setMonthWEEKLY,
          setWeekOfMonthWEEKLY,
          setYearWEEKLY,
        )
      }
      aria-label="다음"
      disabled={
        type === 'MONTHLY'
          ? todayRef.current.month === monthMONTHLY
          : todayRef.current.weekOfMonth === weekOfMonthWEEKLY &&
            todayRef.current.monthOfWeekOfMonth === monthWEEKLY
      }
    >
      <Icon
        icon="chevron_right_outlined"
        className={`${
          type === 'MONTHLY'
            ? todayRef.current.month === monthMONTHLY && 'fill-text-disabled'
            : todayRef.current.weekOfMonth === weekOfMonthWEEKLY &&
              todayRef.current.monthOfWeekOfMonth === monthWEEKLY &&
              'fill-text-disabled'
        }`}
      />
    </button>
  )
}
