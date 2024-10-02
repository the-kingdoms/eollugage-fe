/* eslint-disable react/style-prop-object */

'use client'

import FlexBox from '@/component/shared/flexbox'
import BadgeCard from '@/widgets/join/ui/BadgeCard'
import { ButtonMobile, TopBar } from '@eolluga/eolluga-ui'

export default function ApplePage() {
  return (
    <FlexBox direction="col" className="bg-white w-full h-full items-center w-full h-full relative ">
      <TopBar leftIcon="chevron_left_outlined" />
      <div className="w-full head-02-bold px-spacing-04 text-left mt-spacing-06 mb-[66px]">직원으로 근무 중인가요?</div>
      <BadgeCard />
      <FlexBox direction="col" className="w-full px-spacing-04 py-spacing-03 gap-spacing-02">
        <ButtonMobile size="L" state="enabled" style="primary" text1="네 직원이에요" type="text" />
        <ButtonMobile size="M" state="disabled" style="ghost" text1="아니요 사장님이에요" type="text" />
      </FlexBox>
    </FlexBox>
  )
}
