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
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 6L15 12L9 18"
          stroke={!impossibleNext ? '#161616' : '#16161640'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
