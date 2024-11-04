import { fetchUserInfo } from '@/entities'
import MyPageWidget from '@/widgets/mypage/ui/MyPageWidget'

export default async function MyPage({ params }: { params: { storeId: string } }) {
  const userData = await fetchUserInfo()
  const isOwner = userData?.relationList[0].role === 'OWNER'

  return <MyPageWidget storeId={params.storeId} userData={userData} isOwner={isOwner} />
}
