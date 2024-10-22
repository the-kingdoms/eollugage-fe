/* eslint-disable import/no-cycle */
import { Icon } from '@eolluga/eolluga-ui'
import handlePrev from '../utils/handlePrev'
import useAttendance from '../hooks/useAttendance'

export default function PrevButton() {
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
        handlePrev(
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
      aria-label="이전"
    >
      <Icon icon="chevron_left_outlined" />
    </button>
  )
}
