'use client'

import FlexBox from '@/component/shared/flexbox'
import { ButtonMobile, TextArea, TopBar } from '@eolluga/eolluga-ui'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

export default function NoticePage() {
  const router = useRouter()
  const [noticeText, setNoticeText] = useState('')

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNoticeText(event.target.value)
  }

  return (
    <FlexBox direction="col" className="py-3 h-full">
      <TopBar
        title="가게 공지사항"
        leftIcon="chevron_left_outlined"
        onClickLeftIcon={() => {
          router.push('/home')
        }}
      />
      <FlexBox direction="col" className="w-full mt-8 px-4 h-full justify-between">
        <TextArea size="L" placeholder="공지가 아직 없어요" value={noticeText} onChange={handleTextChange} />
        <ButtonMobile size="L" style="primary" type="text" state="enabled" text1="저장하기" />
      </FlexBox>
    </FlexBox>
  )
}

// 데이터 연결 후 버튼 수정
