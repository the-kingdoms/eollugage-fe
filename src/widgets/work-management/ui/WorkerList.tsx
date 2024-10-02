/* eslint-disable arrow-parens */
import WorkerItem, { Worker } from './WorkerItem'

export default function WorkerList({ workers }: { workers: Worker[] }) {
  return (
    <div className="w-full flex space-x-[12px]">
      {workers.map(worker => (
        <WorkerItem worker={worker} key={worker.id} />
      ))}
    </div>
  )
}
