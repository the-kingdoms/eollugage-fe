/* eslint-disable import/no-cycle */
import { Icon } from '@eolluga/eolluga-ui'
import { useRef } from 'react'

import { MonthState, WeekState } from './DateSelector'
import getObjectWeekOfMonth from '../utils/getObjectOfWeekOfMonth'

interface Today {
  month: number
  weekOfMonth: number
}
/* eslint-disable operator-linebreak */
export default function NextButton({
  onClick,
  type,
  weekState,
  monthState,
}: {
  onClick: () => void
  type: 'month' | 'week'
  weekState: WeekState
  monthState: MonthState
}) {
  const todayRef = useRef<Today>({
    month: new Date().getMonth(),
    weekOfMonth: getObjectWeekOfMonth(new Date()).weekOfMonth,
  })
  return (
    <button
      onClick={onClick}
      aria-label="다음"
      disabled={
        type === 'month'
          ? todayRef.current.month === monthState.month
          : todayRef.current.weekOfMonth === weekState.weekOfMonth
      }
    >
      <Icon
        icon="chevron_right_outlined"
        className={`${
          type === 'month'
            ? todayRef.current.month === monthState.month && 'fill-text-disabled'
            : todayRef.current.weekOfMonth === weekState.weekOfMonth && 'fill-text-disabled'
        }`}
      />
    </button>
  )
}
