'use client'

import FlexBox from '@/shared/ui/Flexbox'
import SignupName from '@/widgets/join/ui/SignupName'
import { useEffect, useState } from 'react'
import { RoleSelection, useJoin } from '@/widgets'
import { useRouter } from 'next/navigation'
import SingupStore from '@/widgets/join/ui/SingupStore'
import UserProfile from '@/widgets/join/ui/UserProfile'
import { UploadImageScreen } from '@/features'
import { useAtom } from 'jotai'
import { storeNameAtom } from '@/shared/atoms/globalAtom'

export default function JoinPage() {
  const { isOwner, step, handleNextStep, handlePreviousStep } = useJoin()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [store, setStore] = useAtom(storeNameAtom)
  const [storeId, setStoreId] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    if (step === 0) {
      router.push('/')
    }
  }, [step, router])

  useEffect(() => {
    if (step === 1) {
      setName('')
      setPhone('')
    }
    if (step === 3) {
      setStore('')
    }
  }, [step])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }
  const handleStoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStore(e.target.value)
  }
  const hadleStoreIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoreId(e.target.value)
  }

  return (
    <FlexBox
      direction="col"
      className="bg-white w-full h-full items-center w-full h-full relative "
    >
      {step === 1 && (
        <SignupName
          name={name}
          phone={phone}
          handleNameChange={handleNameChange}
          handlePhoneChange={handlePhoneChange}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
        />
      )}
      {step === 2 && <RoleSelection handlePreviousStep={handlePreviousStep} />}
      {step === 3 && (
        <SingupStore
          name={name}
          store={store}
          setStore={setStore}
          storeId={storeId}
          setStoreId={setStoreId}
          handleNameChange={handleNameChange}
          handleStoreChange={handleStoreChange}
          hadleStoreIdChange={hadleStoreIdChange}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
        />
      )}
      {step === 4 && (
        <UserProfile
          name={name}
          store={store}
          storeId={storeId}
          handlePreviousStep={handlePreviousStep}
        />
      )}
      {step === 5 && isOwner && <UploadImageScreen page="join" storeId={storeId} />}
    </FlexBox>
  )
}
