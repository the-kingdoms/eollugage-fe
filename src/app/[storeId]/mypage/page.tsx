import { getMy } from '@/features/mypage/api/getMy'
import MyPageWidget from '@/widgets/mypage/ui/MyPageWidget'

export default async function MyPage({ params }: { params: { storeId: string } }) {
  const userData = await getMy()
  return <MyPageWidget storeId={params.storeId} userData={userData} />
}
