import AttendanceInfo from './AttendanceInfo'
import AttendanceRegister from './AttendanceRegister'
import WorkManagementMemberHeader from './WorkManagementMemberHeader'

export default function WorkManagementMember() {
  return (
    <div>
      <WorkManagementMemberHeader userName="JaneDoe" />
      <AttendanceRegister />
      <AttendanceInfo />
    </div>
  )
}
