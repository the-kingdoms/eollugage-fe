import { SetStateAction } from 'react'
import { SetAtom } from '@/shared'
import getObjectWeekOfMonth from './getObjectOfWeekOfMonth'

const handleNext = (
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
  const lastDayOfTheseMonth = new Date(yearWEEKLY, monthWEEKLY, 0).getDate()
  const dayOfTheseMonthLastDay = new Date(yearWEEKLY, monthWEEKLY, 0).getDay()
  const { weekOfMonth: monthWeekOfTheseMonthLastDay } = getObjectWeekOfMonth(
    new Date(yearWEEKLY, monthWEEKLY, 0),
  )
  const weeksInTheseMonth =
    monthWeekOfTheseMonthLastDay === 5 || monthWeekOfTheseMonthLastDay === 4
      ? monthWeekOfTheseMonthLastDay
      : getObjectWeekOfMonth(
          new Date(yearWEEKLY, monthWEEKLY - 2, lastDayOfTheseMonth - dayOfTheseMonthLastDay),
        ).weekOfMonth

  switch (type) {
    case 'MONTHLY':
      if (monthMONTHLY === 12) {
        setYearMONTHLY(yearMONTHLY + 1)
        setMonthMONTHLY(1)
      } else {
        setYearMONTHLY(yearMONTHLY)
        setMonthMONTHLY(monthMONTHLY + 1)
      }
      break
    case 'WEEKLY':
      if (weekOfMonthWEEKLY === weeksInTheseMonth) {
        setYearWEEKLY(monthWEEKLY + 1 > 12 ? yearWEEKLY + 1 : yearWEEKLY)
        setMonthWEEKLY(monthWEEKLY + 1 > 12 ? 1 : monthWEEKLY + 1)
        setWeekOfMonthWEEKLY(1)
      } else {
        setYearWEEKLY(yearWEEKLY)
        setMonthWEEKLY(monthWEEKLY)
        setWeekOfMonthWEEKLY(weekOfMonthWEEKLY + 1)
      }
      break
    default:
      break
  }
}
export default handleNext
