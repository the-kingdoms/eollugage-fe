'use client'

import { useState } from 'react'
import formatDate from '../utils/formateDate'
import PrevButton from './PrevButton'
import NextButton from './NextButton'
import changeDate from '../utils/changeDate'

export default function DateSelector({ type }: { type: 'week' | 'month' }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  return (
    <div className="flex space-x-2 justify-between body-04-bold-compact items-center">
      <PrevButton onClick={() => changeDate(type, selectedDate, setSelectedDate)} />
      <p>{formatDate(selectedDate, type)}</p>
      <NextButton onClick={() => changeDate(type, selectedDate, setSelectedDate)} />
    </div>
  )
}
