const formatDate = (date: string | Date, type: 'week' | 'month'): string => {
  const THURSDAY_NUM = 4
  const targetDate = new Date(date)
  const year = targetDate.getFullYear()
  const month = targetDate.getMonth() + 1

  // 이번 달의 첫째 날과 그 요일 계산
  const firstDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1)
  const firstDayOfWeek = firstDate.getDay()

  // 첫째주 목요일 찾기
  let firstThursday = 1 + THURSDAY_NUM - firstDayOfWeek
  if (firstThursday <= 0) {
    firstThursday += 7
  }

  const untilDateOfFirstWeek = firstThursday - 7 + 3 // 월요일 기준으로 계산
  const weekNum = Math.ceil((targetDate.getDate() - untilDateOfFirstWeek) / 7) - 1

  // 주차가 0보다 작으면 전월의 마지막 주차로 넘어가기
  if (weekNum < 0) {
    const lastDateOfLastMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0)
    return `${lastDateOfLastMonth.getMonth() + 1}월 ${Math.ceil(lastDateOfLastMonth.getDate() / 7)}주차`
  }

  // 전월로 넘어가는 경우 처리: 1일이 화요일이면 9월 5주차로 반환해야 한다
  const currentDayOfWeek = targetDate.getDay()
  if (currentDayOfWeek < 4 && targetDate.getDate() <= 7) {
    const prevMonth = new Date(targetDate.setMonth(targetDate.getMonth() - 1))
    return formatDate(prevMonth, 'week')
  }

  if (type === 'week') {
    return `${month}월 ${weekNum + 1}주차` // 현재 주차 계산
  }
  return `${year}년 ${month}월`
}

export default formatDate
