'use client'

import FlexBox from '@/shared/ui/Flexbox'
import { ButtonMobile, TextField, TopBar } from '@eolluga/eolluga-ui'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePostLogin } from '../model/usePostLogin'
import { StoreT } from '../api/store'
import { useGetAccountInfo } from '../model/useGetAccountInfo'

interface SignupNameProps {
  name: string
  phone: string
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleNextStep: () => void
  handlePreviousStep: () => void
}

export default function SignupName({
  name,
  phone,
  handleNameChange,
  handlePhoneChange,
  handleNextStep,
  handlePreviousStep,
}: SignupNameProps) {
  const [isNumber, setIsNumber] = useState(true)
  const router = useRouter()

  const handleStoreListCheck = (storelist: StoreT[]) => {
    if (storelist && storelist.length > 0) {
      router.push(`/${storelist[0].storeId}/home`)
    } else {
      handleNextStep()
    }
  }
  const { data: accountInfo } = useGetAccountInfo()
  const { mutate } = usePostLogin({ name, phone })

  const handleStartClick = () => {
    const phoneNumberPattern = /^[0-9]+$/
    if (!phoneNumberPattern.test(phone)) {
      setIsNumber(false)
    } else {
      setIsNumber(true)
      mutate()
    }
  }

  useEffect(() => {
    if (accountInfo) handleStoreListCheck(accountInfo.storeList)
  }, [accountInfo])

  return (
    <>
      <TopBar
        leftIcon="chevron_left_outlined"
        onClickLeftIcon={handlePreviousStep}
        title="전화번호로 시작하기"
      />
      <FlexBox direction="col" className="w-full px-spacing-04 gap-spacing-08 pt-spacing-08">
        <TextField
          onChange={handleNameChange}
          size="L"
          style="outlined"
          label="이름"
          placeholder="이름을 입력해주세요"
          value={name}
          description=" "
        />
        <TextField
          onChange={handlePhoneChange}
          size="L"
          style="outlined"
          label="전화번호"
          placeholder="전화번호를 입력해주세요"
          value={phone}
          state={isNumber ? 'enable' : 'error'}
          description={isNumber ? '' : '숫자만 입력해주세요'}
        />
      </FlexBox>
      <FlexBox direction="col" className="w-full p-spacing-04 absolute bottom-4">
        <ButtonMobile
          size="L"
          style="primary"
          state={name && phone ? 'enabled' : 'disabled'}
          type="text"
          text1="시작하기"
          onClick={handleStartClick}
        />
      </FlexBox>
    </>
  )
}
