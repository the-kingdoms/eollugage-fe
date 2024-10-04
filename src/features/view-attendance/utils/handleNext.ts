/* eslint-disable @typescript-eslint/default-param-last */
import { Dispatch, SetStateAction } from 'react'

const handleNext = (
  type: 'month' | 'week',
  setYear: Dispatch<SetStateAction<number>>,
  setMonth: Dispatch<SetStateAction<number>>,
  year: number,
  month: number,
  setWeekOfMonth?: Dispatch<SetStateAction<number>>,
  weekOfMonth?: number,
) => {
  if (type === 'month') {
    if (month === 12) {
      setMonth(1)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  } else {
    // Handle week case if needed
  }
}
export default handleNext
