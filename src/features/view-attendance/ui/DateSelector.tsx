'use client'

/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */

import { useState } from 'react'
import PrevButton from './PrevButton'
import NextButton from './NextButton'
import handlePrev from '../utils/handlePrev'
import handleNext from '../utils/handleNext'

export default function DateSelector({ type }: { type: 'week' | 'month' }) {
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [month, setMonth] = useState<number>(type === 'month' ? new Date().getMonth() + 1 : new Date().getMonth() + 1)
  const [weekOfMonth, setWeekOfMonth] = useState<number>(
    type === 'week' ? new Date().getMonth() + 1 : new Date().getMonth() + 1,
  )

  return (
    <div className="flex space-x-2 justify-between body-04-bold-compact items-center">
      <PrevButton
        onClick={() => {
          handlePrev(type, setYear, setMonth, year, month, setWeekOfMonth, weekOfMonth)
        }}
      />
      {type === 'week' ? (
        <p>{`${month || ''}월 ${weekOfMonth || ''}주차`}</p>
      ) : (
        <p>
          {year || ''}년 {month || ''}월
        </p>
      )}
      <NextButton
        onClick={() => {
          handleNext(type, setYear, setMonth, year, month, setWeekOfMonth, weekOfMonth)
        }}
        type={type}
        month={month}
        year={year}
      />
    </div>
  )
}
