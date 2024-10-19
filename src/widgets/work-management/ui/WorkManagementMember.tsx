import AttendanceInfo from './AttendanceInfo'
import AttendanceRegister from './AttendanceRegister'
import WorkManagementMemberHeader from './WorkManagementMemberHeader'

export default function WorkManagementMember({ storeId }: { storeId: string }) {
  return (
    <div>
      <WorkManagementMemberHeader userName="JaneDoe" />
      <AttendanceRegister storeId={storeId} />
      <AttendanceInfo />
    </div>
  )
}
