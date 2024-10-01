'use client'

import FlexBox from '@/component/shared/flexbox'
import { ButtonMobile, TextArea, TextField, TopBar } from '@eolluga/eolluga-ui'
import { useRouter } from 'next/navigation'

import { ChangeEvent } from 'react'

export default function OrderPage() {
  const router = useRouter()

  return (
    <FlexBox direction="col" className="py-3 h-full">
      <TopBar
        title="발주 항목 추가"
        leftIcon="chevron_left_outlined"
        onClickLeftIcon={() => {
          router.push('/home')
        }}
      />
      <FlexBox direction="col" className="w-full mt-8 px-4 h-full justify-between">
        <FlexBox direction="col" className="w-full gap-8">
          <TextField
            size="L"
            label="발주 이름"
            placeholder="발주 이름을 입력해주세요"
            value=""
            onChange={(e: ChangeEvent<HTMLInputElement>) => {}}
            style="outlined"
          />
          <TextArea
            size="L"
            label="발주 설명"
            placeholder="발주 설명을 입력해주세요"
            value={''}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {}}
          />
        </FlexBox>
        <ButtonMobile size="L" style="primary" type="text" state="enabled" text1="저장하기" />
      </FlexBox>
    </FlexBox>
  )
}
