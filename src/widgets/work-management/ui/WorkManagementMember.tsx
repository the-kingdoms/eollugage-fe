import { getHistories, UserInfo } from '@/entities'
import AttendanceInfo from './AttendanceInfo'
import AttendanceRegister from './AttendanceRegister'
import WorkManagementMemberHeader from './WorkManagementMemberHeader'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getWeekOfMonth } from '@/shared'

export default async function WorkManagementMember({
  storeId,
  userInfo,
}: {
  storeId: string
  userInfo: UserInfo
}) {
  const queryClient = new QueryClient()
  const { year, month, weekOfMonth } = getWeekOfMonth(new Date())
  await queryClient.prefetchQuery({
    queryKey: ['histories', userInfo.id, 'WEEKLY', year, month, weekOfMonth],
    queryFn: () => getHistories(storeId, userInfo.id, 'WEEKLY', year, month, weekOfMonth),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <WorkManagementMemberHeader userName={userInfo.name} />
        <AttendanceRegister storeId={storeId} userInfo={userInfo} />
        <AttendanceInfo storeId={storeId} memberId={userInfo.id} />
      </div>
    </HydrationBoundary>
  )
}
