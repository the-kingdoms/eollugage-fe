import { SetStateAction } from 'jotai'
import { Dispatch } from 'react'

const changeDate = (
  isIncrease: boolean,
  type: 'week' | 'month',
  selectedDate: Date,
  setSelectedDate: Dispatch<SetStateAction<Date>>,
) => {}
export default changeDate
