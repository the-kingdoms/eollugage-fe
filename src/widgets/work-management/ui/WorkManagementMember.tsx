import { UserInfo } from '@/entities'
import AttendanceInfo from './AttendanceInfo'
import AttendanceRegister from './AttendanceRegister'
import WorkManagementMemberHeader from './WorkManagementMemberHeader'

export default function WorkManagementMember({
  storeId,
  userInfo,
}: {
  storeId: string
  userInfo: UserInfo
}) {
  return (
    <div>
      <WorkManagementMemberHeader userName={userInfo.name} />
      <AttendanceRegister storeId={storeId} userInfo={userInfo} />
      <AttendanceInfo storeId={storeId} memberId={userInfo.id} />
    </div>
  )
}
