import { fetchUserInfo } from '@/entities'
import WorkManagementOwner from './WorkManagementOwner'
import WorkManagementMember from './WorkManagementMember'

export default async function WorkManagement({ storeId }: { storeId: string }) {
  const userInfo = await fetchUserInfo()
  if (userInfo === undefined) return null

  return userInfo.relationList.filter(relation => relation.storeId === storeId)[0].position ===
    '1' ? (
    <WorkManagementOwner storeId={storeId} />
  ) : (
    <WorkManagementMember storeId={storeId} userInfo={userInfo} />
  )
}
