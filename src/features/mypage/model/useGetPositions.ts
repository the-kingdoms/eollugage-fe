import { useQuery } from '@tanstack/react-query'
import { getPositions } from '../api/getPositions'

function useGetPosition(storeId: string) {
  const { data, error } = useQuery({
    queryKey: ['getPositions', storeId],
    queryFn: () => getPositions(storeId),
  })
  return { data, error }
}

export { useGetPosition }
