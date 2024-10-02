'use client'

import { Avatar } from '@eolluga/eolluga-ui'
import { useSelectedWorkerID } from './WorkManagementOwnerProvider'

export interface Worker {
  id: string
  name: string
  image: string
  position: string
  phoneNumber: string
}

export default function WorkerItem({ worker }: { worker: Worker }) {
  const [selectedWorkerIDAtom, setSelectedWorkerIDAtom] = useSelectedWorkerID()
  return (
    <button
      className="flex flex-col space-y-1 items-center justify-center text-center"
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
