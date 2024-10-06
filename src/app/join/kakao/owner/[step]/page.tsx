/* eslint-disable object-curly-newline */

'use client'

import FlexBox from '@/component/shared/flexbox'
import getRandomColor from '@/features/join/utils/getRandomColor'
import BottomSheet from '@/shared/ui/bottomSheet'
import { ButtonMobile, TextField, TopBar, Avatar, Scrim, Icon, Dialog } from '@eolluga/eolluga-ui'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function KakaoOwnerPage() {
  const router = useRouter()
  const { step } = useParams()

  const [name, setName] = useState<string>('얼루가게')
  const [storeCode, setStoreCode] = useState<string>('')
  const storeName = '얼루가게 얼루점'

  const [openBottomSheet, setOpenBottomSheet] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)
  const handleStoreCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoreCode(e.target.value)
  }

  const handleOpenBottomSheet = () => setOpenBottomSheet(true)
  const handleCloseBottomSheet = () => {
    setOpenBottomSheet(false)
  }

  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const renderTopText = () => {
    switch (step) {
      case '1':
        return `${name}님이신가요?`
      case '2':
        return (
          <>
            사장님의 <br /> 가게 이름을 알려주세요
          </>
        )
      case '4':
        return (
          <>
            가게 메뉴판에 사용할 <br /> 대표 이미지를 추가해주세요
          </>
        )
      case '5':
        return (
          <>
            가게 메뉴판에 사용할 <br /> 대표 이미지를 추가해주세요
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
            text1="다음"
            onClick={() => router.push(`/join/kakao/owner/2?name=${name}`)}
          />
        )
      case '2':
        return storeCode ? (
          <ButtonMobile
            size="L"
            style="primary"
            state="enabled"
            type="text"
            text1="가게 코드 받기"
            onClick={handleOpenBottomSheet}
          />
        ) : null
      case '3':
        return (
          <ButtonMobile
            size="L"
            style="primary"
            state="enabled"
            type="text"
            text1="프로필 생성하기"
            onClick={() => router.push(`/join/kakao/owner/4?name=${name}`)}
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
            label="가게 이름"
            placeholder="가게 이름을 입력해주세요"
            value={storeCode}
          />
        )}

        {(step === '1' || step === '2') && (
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

      {/* BottomSheet */}
      {openBottomSheet && (
        <Scrim className="fixed inset-0 z-40 flex items-center justify-center" onClick={handleCloseBottomSheet}>
          <BottomSheet onClose={handleCloseBottomSheet} open={openBottomSheet}>
            <FlexBox direction="col" className="w-full text-left items-start gap-spacing-01">
              <div className="body-04-bold">가게 코드는 홈에서 확인할 수 있어요</div>
              <div className="body-01-regular-compact text-[#6F6F6F]">
                새 직원을 가게에 초대할 때 필요합니다. <br />
                직원에게 가게 코드를 공유해주세요.
              </div>
            </FlexBox>
            <div className="w-full mt-[48px] mb-[80px]">
              <TextField
                value="aaaa"
                label="가게 코드"
                size="L"
                style="underlined"
                state="readOnly"
                onChange={() => console.log('')}
              />
            </div>
            <div className="w-full">
              <ButtonMobile
                size="L"
                state="enabled"
                style="primary"
                text1="확인했습니다"
                type="text"
                onClick={() => router.push(`/join/kakao/owner/3?name=${name}`)}
              />
            </div>
          </BottomSheet>
        </Scrim>
      )}

      {/* Profile */}
      {step === '3' && (
        <FlexBox direction="col" className="gap-spacing-04 mt-[152px]">
          <div className="text-white">
            <Avatar size="XL" backgroundColor={getRandomColor()} text={name[0]} />
          </div>
          <FlexBox direction="col" className="gap-spacing-01">
            <div className="head-02-bold">{name} 사장님</div>
            <div className="body-03-medium text-[#6F6F6F]">{storeName}</div>
          </FlexBox>
        </FlexBox>
      )}

      {(step === '4' || step === '5') && (
        <FlexBox direction="col" className="p-spacing-04 h-full relative justify-between">
          <FlexBox direction="col" className="w-full gap-spacing-02 mt-spacing-03 items-start">
            <Image width={328} height={220} layout="responsive" alt="store_img" src="/image/eollugage_main.png" />
            <FlexBox className="w-full gap-spacing-02 mt-spacing-03 items-start">
              <Icon icon="info_circle_filled" className="fill-Blue-70" />
              <div className="body-01-medium text-[#6f6f6f]">
                예시처럼 매장의 전체 공간이 보이는 사진을 선택해주세요.
                <br /> 손님들이 있는 사진보다 손님들이 없는 사진을 선택해주세요.
              </div>
            </FlexBox>
          </FlexBox>
          <FlexBox direction="col" className="w-full py-spacing-03 gap-spacing-02">
            <ButtonMobile
              size="L"
              state="enabled"
              style="primary"
              text1={step === '4' ? '앨범에서 선택하기' : '가게 완성하기'}
              type="text"
              onClick={step === '4' ? handleOpenDialog : () => router.push('/home')}
            />
            <ButtonMobile
              size="M"
              state="enabled"
              style="ghost"
              text1={step === '4' ? '나중에 추가하기' : '사진 바꾸기'}
              type="text"
              onClick={() => {
                if (step === '4') router.push('/join/kakao/owner/5')
                router.push('/join/kakao/owner/1')
              }}
            />
          </FlexBox>
        </FlexBox>
      )}
      {openDialog && (
        <Scrim className="fixed inset-0 z-40 flex items-center justify-center" onClick={handleCloseDialog}>
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            title="가게를 이대로 완성하실 건가요?"
            description="가게 사진을 추가했을 때 손님들이 더 좋아해요. 이대로 가게를 완성하실 건가요?"
            leftText="사진 추가하기"
            rightText="이대로 완성하기"
            dismissible
            leftOnClick={handleCloseDialog}
            rightOnClick={() => router.push('/join/kakao/owner/5')}
          />
        </Scrim>
      )}
    </FlexBox>
  )
}
