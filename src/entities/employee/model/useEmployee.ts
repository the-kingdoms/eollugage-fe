import { useQuery } from '@tanstack/react-query'
import getEmployees from '../api/getEmployees'
import { Employees } from '../types/employee'

const useEmployee = (storeId: string) => {
  const { data: employees } = useQuery<Employees>({
    queryKey: ['employees', storeId],
    queryFn: () => getEmployees(storeId),
  })
  return { employees }
}
export default useEmployee
