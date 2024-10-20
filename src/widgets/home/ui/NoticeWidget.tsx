'use client'

import FlexBox from '@/shared/ui/Flexbox'
import { ButtonMobile, TextArea, TopBar } from '@eolluga/eolluga-ui'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import { noticeAtom } from '../atoms/homeAtoms'
import { usePutStoreDetail } from '../model/usePutStoreDetail'

interface NoticeWidgetProps {
  storeId: string
}

export default function NoticeWidget({ storeId }: NoticeWidgetProps) {
  const router = useRouter()
  const [noticeText, setNoticeText] = useAtom(noticeAtom)
  const [buttonText, setButtonText] = useState('추가하기')

  const { mutate } = usePutStoreDetail(noticeText, storeId)

  useEffect(() => {
    if (noticeText.trim()) {
      setButtonText('수정하기')
    } else {
      setButtonText('추가하기')
    }
  }, [])

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNoticeText(event.target.value)
  }

  const handleFocus = () => {
    setButtonText('저장하기')
  }

  const handleButtonClick = () => {
    if (buttonText === '추가하기' || buttonText === '수정하기') {
      const textArea = document.querySelector('textarea') as HTMLTextAreaElement
      textArea.focus()
    } else {
      mutate()
      router.push(`/${storeId}/home`)
    }
  }

  return (
    <FlexBox direction="col" className="py-3 h-full">
      <TopBar
        title="가게 공지사항"
        leftIcon="chevron_left_outlined"
        onClickLeftIcon={() => {
          router.push(`/${storeId}/home`)
        }}
      />
      <FlexBox direction="col" className="w-full mt-8 px-4 h-full justify-between">
        <div className="w-full" onFocus={handleFocus}>
          <TextArea
            size="L"
            placeholder="공지가 아직 없어요"
            value={noticeText}
            onChange={handleTextChange}
          />
        </div>
        <ButtonMobile
          size="L"
          style="primary"
          type="text"
          state="enabled"
          text1={buttonText}
          onClick={handleButtonClick}
        />
      </FlexBox>
    </FlexBox>
  )
}
