import MyPageWidget from '@/widgets/mypage/ui/MyPageWidget'

export default function MyPage({ params }: { params: { storeId: string } }) {
  return <MyPageWidget storeId={params.storeId} />
}
