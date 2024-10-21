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
    monthMonthly,
    monthWeekly,
    yearMonthly,
    yearWeekly,
    weekOfMonthWeekly,
    setMonthMonthly,
    setMonthWeekly,
    setWeekOfMonthWeekly,
    setYearMonthly,
    setYearWeekly,
  } = useAttendance()

  return (
    <button
      type="button"
      onClick={() =>
        handleNext(
          type,
          monthMonthly,
          monthWeekly,
          yearMonthly,
          yearWeekly,
          weekOfMonthWeekly,
          setYearMonthly,
          setMonthMonthly,
          setMonthWeekly,
          setWeekOfMonthWeekly,
          setYearWeekly,
        )
      }
      aria-label="다음"
      disabled={
        type === 'monthly'
          ? todayRef.current.month === monthMonthly
          : todayRef.current.weekOfMonth === weekOfMonthWeekly &&
            todayRef.current.monthOfWeekOfMonth === monthWeekly
      }
    >
      <Icon
        icon="chevron_right_outlined"
        className={`${
          type === 'monthly'
            ? todayRef.current.month === monthMonthly && 'fill-text-disabled'
            : todayRef.current.weekOfMonth === weekOfMonthWeekly &&
              todayRef.current.monthOfWeekOfMonth === monthWeekly &&
              'fill-text-disabled'
        }`}
      />
    </button>
  )
}
