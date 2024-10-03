const getCurrentWeekOfMonth = (date: Date) => {
  const calendar = new Date(date)
  const month = calendar.getMonth() + 1
  const day = calendar.getDate()

  // 한 주의 시작을 월요일로 설정하고, 첫 주에 최소 4일이 포함되어야 첫 주로 간주
  const firstDayOfMonth = new Date(calendar.getFullYear(), calendar.getMonth(), 1)
  const firstDayOfWeek = firstDayOfMonth.getDay()

  // 첫 주가 4일을 포함하지 않으면 전 달 마지막 주차로 계산
  const weekOfMonth = Math.ceil((day + firstDayOfWeek - 1) / 7)

  if (weekOfMonth === 0) {
    // 전 달의 마지막 주차로 계산
    const previousMonth = new Date(calendar.getFullYear(), calendar.getMonth() - 1, day)
    return getCurrentWeekOfMonth(previousMonth)
  }

  // 마지막 주차일 때 처리
  const lastDayOfMonth = new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0) // 이번 달 마지막 날
  const lastDayOfWeek = lastDayOfMonth.getDay()

  if (weekOfMonth === Math.ceil((lastDayOfMonth.getDate() + firstDayOfWeek - 1) / 7)) {
    // 이번 달 마지막 주차일 때, 마지막 날이 월~수인 경우
    if (lastDayOfWeek >= 1 && lastDayOfWeek <= 3) {
      const nextMonth = new Date(calendar.getFullYear(), calendar.getMonth() + 1, 1)
      return getCurrentWeekOfMonth(nextMonth)
    }
  }

  return { month, weekOfMonth }
}
export default getCurrentWeekOfMonth
