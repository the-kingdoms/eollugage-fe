import { Employees } from '@/entities'
import DragScrollWrapper from './DragScrollWrapper'
import EmployeeItem from './EmployeeItem'

export default function EmployeeList({ employees }: { employees: Employees | undefined }) {
  if (!employees) return null
  return (
    <DragScrollWrapper>
      {employees.map((employee, i) => (
        <>
          {i === 0 && <span className="w-[16px] h-1" />}
          <EmployeeItem employee={employee} key={employee.id} />
        </>
      ))}
    </DragScrollWrapper>
  )
}
