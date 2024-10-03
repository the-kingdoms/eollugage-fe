'use client'

/* eslint-disable max-len */

import { useState } from 'react'
import PrevButton from './PrevButton'
import NextButton from './NextButton'

export default function DateSelector({ type }: { type: 'week' | 'month' }) {
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [month, setMonth] = useState<number>()
  const [weekOfMonth, setWeekOfMonth] = useState<number>()

  return (
    <div className="flex space-x-2 justify-between body-04-bold-compact items-center">
      <PrevButton />
      {type === 'week' ? (
        <p>{`${month || ''}월 ${weekOfMonth || ''}주차`}</p>
      ) : (
        <p>
          {year || ''}년 {month || ''}월
        </p>
      )}
      <NextButton />
    </div>
  )
}
