import { checkIsOwner, fetchUserInfo } from '@/entities'
import MyPageWidget from '@/widgets/mypage/ui/MyPageWidget'

export default async function MyPage({ params }: { params: { storeId: string } }) {
  const userData = await fetchUserInfo()
  if (userData === undefined) return null

  const isOwner = checkIsOwner(userData)
  return <MyPageWidget storeId={params.storeId} userData={userData} isOwner={isOwner} />
}
