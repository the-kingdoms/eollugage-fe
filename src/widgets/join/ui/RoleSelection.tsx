'use client'

import FlexBox from '@/shared/ui/Flexbox'
import { ButtonMobile } from '@eolluga/eolluga-ui'
import React from 'react'
import { useRouter } from 'next/navigation'
import BadgeCard from './BadgeCard'
import useJoin from '../hooks/useJoin'

export default function RoleSelection() {
  const { setEmployeeRole, setOwnerRole, handleNextStep } = useJoin()

  const router = useRouter()

  const handleEmployeeClick = () => {
    setEmployeeRole()
    handleNextStep()
  }

  const handleOwnerClick = () => {
    setOwnerRole()
    router.push('/join/owner')
    handleNextStep()
  }

  return (
    <>
      <div className="w-full head-02-bold px-spacing-04 text-left mt-spacing-06 mb-[66px]">
        직원으로 근무 중인가요?
      </div>
      <BadgeCard />
      <FlexBox direction="col" className="w-full px-spacing-04 py-spacing-03 gap-spacing-02">
        <ButtonMobile
          onClick={handleEmployeeClick}
          size="L"
          state="enabled"
          style="primary"
          text1="네 직원이에요"
          type="text"
        />
        <ButtonMobile
          onClick={handleOwnerClick}
          size="M"
          state="enabled"
          style="ghost"
          text1="아니요 사장님이에요"
          type="text"
        />
      </FlexBox>
    </>
  )
}
