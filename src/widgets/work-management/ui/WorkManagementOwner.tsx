import { AttendanceInfo } from '@/features'
import WorkerSelector from './WorkerSelector'
import WorkManagementOwnerProvider from './WorkManagementOwnerProvider'

export default function WorkManagementOwner() {
  return (
    <WorkManagementOwnerProvider>
      <WorkerSelector />
      <AttendanceInfo />
    </WorkManagementOwnerProvider>
  )
}
