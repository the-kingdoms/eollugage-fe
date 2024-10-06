import { Icon } from '@eolluga/eolluga-ui'

/* eslint-disable operator-linebreak */
export default function NextButton({
  onClick,
  type,
  month,
  year,
}: {
  onClick: () => void
  type: 'month' | 'week'
  month: number
  year: number
}) {
  const currentDate = new Date()
  const isCurrentMonth = month === currentDate.getMonth() + 1
  const isCurrentYear = year === currentDate.getFullYear()
  const impossibleNext = type === 'month' && isCurrentMonth && isCurrentYear
  return (
    <button onClick={onClick} aria-label="다음" disabled={impossibleNext}>
      <Icon icon="chevron_right_outlined" className={impossibleNext ? 'fill-text-disabled' : ''} />
    </button>
  )
}
