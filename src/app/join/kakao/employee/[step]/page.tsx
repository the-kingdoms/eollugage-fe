/* eslint-disable object-curly-newline */

'use client'

import FlexBox from '@/component/shared/flexbox'
import getRandomColor from '@/features/join/utils/getRandomColor'
import { ButtonMobile, TextField, TopBar, Dialog, Scrim, Avatar } from '@eolluga/eolluga-ui'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function KakaoEmployeePage() {
  const router = useRouter()
  const { step } = useParams()

  const [name, setName] = useState<string>('얼루가')
  const [storeCode, setStoreCode] = useState<string>('')
  const storeName = '얼루가게 얼루점'

  const [open, setOpen] = useState(false)
  const [valid, setValid] = useState(true)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)
  const handleStoreCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValid(true)
    setStoreCode(e.target.value)
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setValid(false)
    setStoreCode('')
  }

  const renderTopText = () => {
    switch (step) {
      case '1':
        return `${name}님이신가요?`
      case '2':
        return (
          <>
            근무 중인 가게의 <br /> 코드를 입력해주세요
          </>
        )
      default:
        return ''
    }
  }

  const renderBottomButton = () => {
    switch (step) {
      case '1':
        return (
          <ButtonMobile
            size="L"
            style="primary"
            state="enabled"
            type="text"
            text1="맞아요"
            onClick={() => router.push('/join/kakao/employee/2')}
          />
        )
      case '2':
        return storeCode ? (
          <ButtonMobile
            size="L"
            style="primary"
            state="enabled"
            type="text"
            text1="코드 승인 받기"
            onClick={handleOpen}
          />
        ) : null
      case '3':
        return (
          <ButtonMobile
            size="L"
            style="primary"
            state="enabled"
            type="text"
            text1="출근하기"
            onClick={() => router.push('/home')}
          />
        )
      default:
        return null
    }
  }

  return (
    <FlexBox direction="col" className="bg-white w-full h-full items-center relative">
      <TopBar leftIcon="chevron_left_outlined" onClickLeftIcon={() => router.back()} />

      {/* Top Text */}
      {step !== '3' && (
        <div className="w-full head-02-bold h-[52px] px-spacing-04 text-left mt-spacing-06 mb-[66px]">
          {renderTopText()}
        </div>
      )}

      {/* Input Fields */}
      <FlexBox direction="col" className="w-full px-spacing-04 gap-spacing-08">
        {step === '2' && (
          <TextField
            onChange={handleStoreCodeChange}
            size="L"
            style="underlined"
            label="근무 중인 가게 코드"
            placeholder="가게 코드를 입력해주세요"
            value={storeCode}
            state={valid ? 'enable' : 'error'}
            description={valid ? '' : '가게 코드를 확인해주세요'}
          />
        )}

        {step !== '3' && (
          <TextField
            onChange={handleNameChange}
            size="L"
            style="underlined"
            label="이름"
            placeholder="이름을 입력해주세요"
            value={name}
            state={step === '2' ? 'readOnly' : 'enable'}
          />
        )}

        {/* Bottom Button */}
        <FlexBox direction="col" className="w-full p-spacing-04 absolute bottom-4">
          {renderBottomButton()}
        </FlexBox>
      </FlexBox>

      {/* Profile */}
      {step === '3' && (
        <FlexBox direction="col" className="gap-spacing-04 mt-[152px]">
          <div className="text-white">
            <Avatar size="XL" backgroundColor={getRandomColor()} text={name[0]} />
          </div>
          <FlexBox direction="col" className="gap-spacing-01">
            <div className="head-02-bold">{name} 직원</div>
            <div className="body-03-medium text-[#6F6F6F]">{storeName}</div>
          </FlexBox>
        </FlexBox>
      )}

      {/* Dialog and Scrim */}
      {open && (
        <Scrim className="fixed inset-0 z-40 flex items-center justify-center" onClick={handleClose}>
          <Dialog
            open={open}
            onClose={handleClose}
            title="코드 승인"
            description={`코드가 승인되었습니다. 가게 이름이 ${storeName}이 맞나요?`}
            leftText="아니요"
            rightText="네"
            dismissible
            leftOnClick={handleClose}
            rightOnClick={() => router.push('/join/kakao/employee/3')}
          />
        </Scrim>
      )}
    </FlexBox>
  )
}
