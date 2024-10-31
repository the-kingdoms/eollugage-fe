import { fetchUserInfo } from '@/entities'
import MyPageWidget from '@/widgets/mypage/ui/MyPageWidget'

export default async function MyPage({ params }: { params: { storeId: string } }) {
  const userData = await fetchUserInfo()
  return <MyPageWidget storeId={params.storeId} userData={userData} />
}
