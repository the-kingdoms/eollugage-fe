'use client'

import { useState } from 'react'
import FlexBox from '@/shared/flexbox'
import { ButtonMobile, TextField, TopBar } from '@eolluga/eolluga-ui'
import { useRouter } from 'next/navigation'

export default function PhonePage() {
  const router = useRouter()
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }

  return (
    <FlexBox direction="col" className="bg-white w-full h-full items-center relative gap-spacing-08">
      <TopBar leftIcon="chevron_left_outlined" title="전화번호로 시작하기" onClickLeftIcon={() => router.back()} />
      <FlexBox direction="col" className="w-full px-spacing-04 gap-spacing-08">
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
        />
      </FlexBox>
      <FlexBox direction="col" className="w-full p-spacing-04 absolute bottom-4">
        <ButtonMobile size="L" style="primary" state="enabled" type="text" text1="시작하기" />
      </FlexBox>
    </FlexBox>
  )
}
