import { SetStateAction } from 'react'
import { SetAtom } from '@/shared'
import getObjectWeekOfMonth from './getObjectOfWeekOfMonth'

const handlePrev = (
  type: 'MONTHLY' | 'WEEKLY',
  monthMONTHLY: number,
  monthWEEKLY: number,
  yearMONTHLY: number,
  yearWEEKLY: number,
  weekOfMonthWEEKLY: number,
  setYearMONTHLY: SetAtom<[SetStateAction<number>], void>,
  setMonthMONTHLY: SetAtom<[SetStateAction<number>], void>,
  setMonthWEEKLY: SetAtom<[SetStateAction<number>], void>,
  setWeekOfMonthWEEKLY: SetAtom<[SetStateAction<number>], void>,
  setYearWEEKLY: SetAtom<[SetStateAction<number>], void>,
) => {
  const lastDayOfThePrevMonth = new Date(yearWEEKLY, monthWEEKLY - 1, 0).getDate()
  const dayOfThePrevMonthLastDay = new Date(yearWEEKLY, monthWEEKLY - 1, 0).getDay()
  const { weekOfMonth: monthWeekOfPrevMonthLastDay } = getObjectWeekOfMonth(
    new Date(yearWEEKLY, monthWEEKLY - 1, 0),
  )
  const weeksInPrevMonth =
    monthWeekOfPrevMonthLastDay === 5 || monthWeekOfPrevMonthLastDay === 4
      ? monthWeekOfPrevMonthLastDay
      : getObjectWeekOfMonth(
          new Date(yearWEEKLY, monthWEEKLY - 2, lastDayOfThePrevMonth - dayOfThePrevMonthLastDay),
        ).weekOfMonth

  switch (type) {
    case 'MONTHLY':
      if (monthMONTHLY === 1) {
        setYearMONTHLY(yearMONTHLY - 1)
        setMonthMONTHLY(12)
      } else {
        setYearMONTHLY(yearMONTHLY)
        setMonthMONTHLY(monthMONTHLY - 1)
      }
      break
    case 'WEEKLY':
      if (weekOfMonthWEEKLY === 1) {
        setYearWEEKLY(monthWEEKLY - 1 <= 0 ? yearWEEKLY - 1 : yearWEEKLY)
        setMonthWEEKLY(monthWEEKLY - 1 <= 0 ? 12 : monthWEEKLY - 1)
        setWeekOfMonthWEEKLY(weeksInPrevMonth)
      } else {
        setYearWEEKLY(yearWEEKLY)
        setMonthWEEKLY(monthWEEKLY)
        setWeekOfMonthWEEKLY(weekOfMonthWEEKLY - 1)
      }
      break
    default:
      break
  }
}
export default handlePrev
