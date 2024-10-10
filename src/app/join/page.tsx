'use client'

import FlexBox from '@/shared/ui/Flexbox'
import { TopBar } from '@eolluga/eolluga-ui'
import SignupName from '@/widgets/join/ui/SignupName'
import { useEffect, useState } from 'react'
import { RoleSelection, useJoin } from '@/widgets'
import { useRouter } from 'next/navigation'

export default function JoinPage() {
  const { step, handleNextStep, handlePreviousStep } = useJoin()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (step === 0) {
      router.push('/')
    }
  }, [step, router])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }

  return (
    <FlexBox
      direction="col"
      className="bg-white w-full h-full items-center w-full h-full relative "
    >
      <TopBar
        leftIcon="chevron_left_outlined"
        onClickLeftIcon={handlePreviousStep}
        title={step === 1 ? '전화번호로 시작히기' : ''}
      />
      {step === 1 && (
        <SignupName
          name={name}
          phone={phone}
          handleNameChange={handleNameChange}
          handlePhoneChange={handlePhoneChange}
          handleNextStep={handleNextStep}
        />
      )}
      {step === 2 && <RoleSelection />}
    </FlexBox>
  )
}
