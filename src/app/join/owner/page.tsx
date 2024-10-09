import FlexBox from '@/shared/ui/Flexbox'
import { SignupInput } from '@/widgets'
import { TopBar } from '@eolluga/eolluga-ui'
import React from 'react'

export default function OwnerJoinPage() {
  return (
    <FlexBox
      direction="col"
      className="bg-white w-full h-full items-center w-full h-full relative "
    >
      <TopBar leftIcon="chevron_left_outlined" />
      <SignupInput />
    </FlexBox>
  )
}
