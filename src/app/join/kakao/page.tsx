'use client'

import { useRouter } from 'next/navigation'
import FlexBox from '@/component/shared/flexbox'
import BadgeCard from '@/widgets/join/ui/BadgeCard'
import { ButtonMobile, TopBar } from '@eolluga/eolluga-ui'
import { useSetAtom } from 'jotai'
import { isOwnerAtom } from '@/lib/globalState'

export default function KakaoPage() {
  const router = useRouter()
  const setIsOwner = useSetAtom(isOwnerAtom)

  return (
    <FlexBox direction="col" className="bg-white w-full h-full items-center relative ">
      <TopBar leftIcon="chevron_left_outlined" onClickLeftIcon={() => router.back()} />
      <div className="w-full head-02-bold px-spacing-04 text-left mt-spacing-06 mb-[66px]">직원으로 근무 중인가요?</div>
      <BadgeCard />
      <FlexBox direction="col" className="w-full px-spacing-04 py-spacing-03 gap-spacing-02">
        <ButtonMobile
          size="L"
          state="enabled"
          style="primary"
          text1="네 직원이에요"
          type="text"
          onClick={() => {
            setIsOwner(false)
            router.push('/join/kakao/employee/1')
          }}
        />
        <ButtonMobile
          size="M"
          state="enabled"
          style="ghost"
          text1="아니요 사장님이에요"
          type="text"
          onClick={() => {
            setIsOwner(true)
            router.push('/join/kakao/owner/1')
          }}
        />
      </FlexBox>
    </FlexBox>
  )
}
