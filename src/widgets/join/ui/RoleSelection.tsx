import { ButtonMobile } from '@eolluga/eolluga-ui'
import React from 'react'
import FlexBox from '@/shared/ui/Flexbox'
import BadgeCard from './BadgeCard'

export default function RoleSelection() {
  return (
    <>
      <div className="w-full head-02-bold px-spacing-04 text-left mt-spacing-06 mb-[66px]">
        직원으로 근무 중인가요?
      </div>
      <BadgeCard />
      <FlexBox direction="col" className="w-full px-spacing-04 py-spacing-03 gap-spacing-02">
        <ButtonMobile size="L" state="enabled" style="primary" text1="네 직원이에요" type="text" />
        <ButtonMobile
          size="M"
          state="disabled"
          style="ghost"
          text1="아니요 사장님이에요"
          type="text"
        />
      </FlexBox>
    </>
  )
}
