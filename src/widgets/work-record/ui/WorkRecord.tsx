import { AttendanceInfo } from '@/features'
import AttendanceRegister from './AttendanceRegister'
import WorkRecordHeader from './WorkRecordHeader'

export default function WorkRecord() {
  return (
    <div>
      <WorkRecordHeader userName="JaneDoe" />
      <AttendanceRegister />
      <AttendanceInfo />
    </div>
  )
}
