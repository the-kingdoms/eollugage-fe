/* eslint-disable import/no-cycle */
import { Icon } from '@eolluga/eolluga-ui'
import { MonthState, WeekState } from './DateSelector'

export default function PrevButton({
  onClick,
  weekState,
  monthState,
}: {
  onClick: () => void
  weekState: WeekState
  monthState: MonthState
}) {
  return (
    <button onClick={onClick} aria-label="이전">
      <Icon icon="chevron_left_outlined" />
    </button>
  )
}
