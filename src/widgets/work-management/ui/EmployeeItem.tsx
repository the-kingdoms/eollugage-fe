'use client'

import { Avatar } from '@eolluga/eolluga-ui'
import { useAtom } from 'jotai'
import { Employee } from '@/entities'
import { selectedEmployeeAtom } from '../atoms/workManagementAtoms'

export default function EmployeeItem({ employee }: { employee: Employee }) {
  const [selectedEmployeeIDAtom, setSelectedEmployeeIDAtom] = useAtom(selectedEmployeeAtom)
  return (
    <button
      className="h-[90px] w-[48px] flex flex-col space-y-1 items-center justify-end text-center"
      type="button"
      onClick={() => setSelectedEmployeeIDAtom(employee.id)}
    >
      <span
        className={`${selectedEmployeeIDAtom === employee.id ? 'border border-white rounded-full' : 'opacity-70'}`}
      >
        <Avatar size="S" image={employee?.image || undefined} />
      </span>
      <div>
        <p
          className={`body-02-medium-compact  ${selectedEmployeeIDAtom === employee.id ? 'text-white' : 'text-[#8D8D8D]'}`}
        >
          {employee.name}
        </p>
        <p
          className={`body-01-medium-compact ${selectedEmployeeIDAtom === employee.id ? 'text-[#6F6F6F]' : 'text-[#8D8D8D]'}`}
        >
          {employee.position}
        </p>
      </div>
    </button>
  )
}
