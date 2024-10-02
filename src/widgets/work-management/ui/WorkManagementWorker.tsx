import { AttendanceInfo } from '@/features'
import AttendanceRegister from './AttendanceRegister'
import WorkManagementWorkerHeader from './WorkManagementWorkerHeader'

export default function WorkManagementWorker() {
  return (
    <div>
      <WorkManagementWorkerHeader userName="JaneDoe" />
      <AttendanceRegister />
      <AttendanceInfo />
    </div>
  )
}
