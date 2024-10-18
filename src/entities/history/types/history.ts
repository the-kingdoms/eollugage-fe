export interface History {
  id: number
  date: string
  startTime: string
  endTime: string | null
}

export interface Histories {
  storeId: string
  memberId: string
  type: 'weekly' | 'monthly'
  year: number
  month: number
  weekOfMonth?: number | null
  histories: History[]
}
