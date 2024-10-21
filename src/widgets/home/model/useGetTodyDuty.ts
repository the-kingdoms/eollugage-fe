import { useQuery } from '@tanstack/react-query'
import { getTodayDuty } from '../api/getTodayDuty'

function useGetTodayDuty(stordId: string, date: string) {
  const { data } = useQuery({
    queryKey: ['getTodayDuty'],
    queryFn: () => getTodayDuty(stordId, date),
  })

  return { data }
}

export { useGetTodayDuty }
