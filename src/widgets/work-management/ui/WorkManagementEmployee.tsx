import AttendanceInfo from './AttendanceInfo'
import AttendanceRegister from './AttendanceRegister'
import WorkManagementEmployeeHeader from './WorkManagementEmployeeHeader'

export default function WorkManagementEmployee() {
  return (
    <div>
      <WorkManagementEmployeeHeader userName="JaneDoe" />
      <AttendanceRegister />
      <AttendanceInfo />
    </div>
  )
}
