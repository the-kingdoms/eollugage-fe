/* eslint-disable arrow-parens */
import DragScrollWrapper from './DragScrollWrapper'
import WorkerItem, { Worker } from './WorkerItem'

export default function WorkerList({ workers }: { workers: Worker[] }) {
  return (
    <DragScrollWrapper>
      {workers.map(worker => (
        <WorkerItem worker={worker} key={worker.id} />
      ))}
    </DragScrollWrapper>
  )
}
