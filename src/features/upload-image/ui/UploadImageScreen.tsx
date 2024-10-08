'use client'

import FlexBox from '@/shared/ui/Flexbox'
import { ButtonMobile, Icon, TopBar } from '@eolluga/eolluga-ui'
import { sendRNFunction } from '../utils/rnSender'
import { useEffect, useState } from 'react'
import { ImageUploadResultT } from '../types/imageUploadType'

export default function ImageUploadScreen() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const onClickSelectButton = () => sendRNFunction('accessGallery')

  const onMessageEvent = (e: MessageEvent) => {
    e.stopPropagation()
    const message: { type: string; data: ImageUploadResultT } = JSON.parse(String(e.data))

    if (message.type === 'getImageUploadResult') {
      console.log(message.data.isSuccess)
      setIsSuccess(message.data.isSuccess)
    }
  }

  useEffect(() => {
    window.addEventListener('message', onMessageEvent)
    document.addEventListener('message', onMessageEvent as EventListener)
  }, [])

  return (
    <FlexBox direction="col" className="w-full h-full justify-between">
      <FlexBox direction="col" className="w-full ">
        <TopBar leftIcon="chevron_left_outlined" />
        <FlexBox direction="col" className="w-full px-4">
          <div className="w-full head-02-bold mt-6">
            가게 메뉴판에 사용할
            <br />
            대표 이미지를 추가해주세요
          </div>
          <div className="w-full aspect-[4/3] bg-gray-200 mt-12"></div>
          <FlexBox className="items-start w-full gap-4 mt-3">
            <Icon icon="info_circle_filled" size={20} className="fill-support-info shrink-0" />
            <div className="w-full body-01-medium text-text-helper">
              예시처럼 매장의 전체 공간이 보이는 사진을 선택해주세요.
              <br />
              손님들이 있는 사진보다 손님들이 없는 사진을 선택해주세요.
            </div>
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <FlexBox direction="col" className="w-full gap-2 py-3 px-4">
        <ButtonMobile
          size="L"
          style="primary"
          type="text"
          state="enabled"
          text1="앨범에서 선택하기"
          onClick={onClickSelectButton}
        />
        <FlexBox className="w-full justify-center">
          <button className="py-3 label-02-bold text-text-disabled">나중에 추가하기</button>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}
