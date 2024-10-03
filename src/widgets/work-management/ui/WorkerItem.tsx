'use client'

import { Avatar } from '@eolluga/eolluga-ui'
import { useAtom } from 'jotai'
import { selectedWorkerAtom } from '../atoms/workManagementAtoms'

export interface Worker {
  id: string
  name: string
  image: string
  position: string
  phoneNumber: string
}

export default function WorkerItem({ worker }: { worker: Worker }) {
  const [selectedWorkerIDAtom, setSelectedWorkerIDAtom] = useAtom(selectedWorkerAtom)
  return (
    <button
      className="h-[88px] w-[48px] flex flex-col space-y-1 items-center justify-end text-center"
      type="button"
      onClick={() => setSelectedWorkerIDAtom(worker.id)}
    >
      <Avatar size="S" image={worker?.image || undefined} border={selectedWorkerIDAtom === worker.id} />
      <div>
        <p
          className={`body-02-medium-compact  ${selectedWorkerIDAtom === worker.id ? 'text-white' : 'text-[#8D8D8D]'}`}
        >
          {worker.name}
        </p>
        <p
          className={`body-01-medium-compact ${selectedWorkerIDAtom === worker.id ? 'text-[#6F6F6F]' : 'text-[#8D8D8D]'}`}
        >
          {worker.position}
        </p>
      </div>
    </button>
  )
}
