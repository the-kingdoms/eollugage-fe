/* eslint-disable implicit-arrow-linebreak */

'use client'

import FlexBox from '@/shared/ui/Flexbox'
import { ButtonMobile, Dialog, Scrim, TextField, TopBar } from '@eolluga/eolluga-ui'
import { useState } from 'react'
import ToastMessage from '@/shared/ui/ToastMessage'
import useJoin from '../hooks/useJoin'
import BottomSheet from './BottomSheet'
import { usePostStoreInfo } from '../api/usePostStoreInfo'

interface SignupStoreProps {
  name: string
  store: string
  setStore: React.Dispatch<React.SetStateAction<string>>
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleStoreChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleNextStep: () => void
  handlePreviousStep: () => void
}

export default function SingupStore({
  name,
  store,
  handleNameChange,
  handleStoreChange,
  handleNextStep,
  handlePreviousStep,
  setStore,
}: SignupStoreProps) {
  const { isOwner } = useJoin()
  const [openDialog, setOpenDialog] = useState(false)
  const [openBottomSheet, setOpenBottomSheet] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [approvalFailed, setApprovalFailed] = useState(false)

  const { mutate } = usePostStoreInfo(name)

  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleOpenBottomSheet = () => {
    mutate()
    setOpenBottomSheet(true)
  }

  const handleDisagree = () => {
    setShowToast(true)
    setOpenDialog(false)
  }

  const handleAgree = () => {
    const isApproved = true

    if (isApproved) {
      handleNextStep()
    } else {
      setApprovalFailed(true)
      setStore('')
      setOpenDialog(false)
    }
  }

  const getGreetingText = () =>
    isOwner ? (
      <>
        사장님의 <br />
        가게 이름을 알려주세요
      </>
    ) : (
      <>
        근무 중인 가게의
        <br />
        코드를 입력해주세요
      </>
    )

  return (
    <>
      <TopBar leftIcon="chevron_left_outlined" onClickLeftIcon={handlePreviousStep} />
      <div className="w-full head-02-bold h-[52px] px-spacing-04 text-left mt-spacing-06 mb-[66px]">
        {getGreetingText()}
      </div>
      <FlexBox direction="col" className="w-full px-spacing-04 gap-spacing-08">
        <TextField
          onChange={handleStoreChange}
          size="L"
          style="underlined"
          label={isOwner ? '가게 이름' : '근무 중인 가게 코드'}
          placeholder={isOwner ? '가게 이름을 입력해주세요' : '가게 코드를 입력해주세요'}
          value={store}
          state={approvalFailed && store.length === 0 ? 'error' : 'enable'}
          description={approvalFailed ? '가게 코드를 확인해주세요' : ''}
        />
        <TextField
          onChange={handleNameChange}
          size="L"
          style="underlined"
          label="이름"
          placeholder="이름을 입력해주세요"
          state="readOnly"
          value={name}
        />
        <FlexBox direction="col" className="w-full p-spacing-04 absolute bottom-4">
          {showToast && (
            <div className="w-full mb-spacing-03">
              <ToastMessage
                message="가게 이름이 일치하지 않습니다. 다시 확인해주세요."
                icon="warning"
                open={showToast}
                setOpen={setShowToast}
              />
            </div>
          )}
          {store.length > 0 && (
            <ButtonMobile
              size="L"
              style="primary"
              state="enabled"
              type="text"
              text1={isOwner ? '가게 코드 받기' : '코드 승인 받기'}
              onClick={isOwner ? handleOpenBottomSheet : handleOpenDialog}
            />
          )}
        </FlexBox>
        {openDialog && (
          <Scrim
            className="fixed inset-0 z-40 flex items-center justify-center"
            onClick={handleCloseDialog}
          >
            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              title="코드 승인"
              description={`코드가 승인되었습니다. 가게 이름이 ${store}이 맞나요?`}
              leftText="아니요"
              rightText="네"
              dismissible
              leftOnClick={handleDisagree}
              rightOnClick={handleAgree}
            />
          </Scrim>
        )}
        {openBottomSheet && (
          <BottomSheet
            openBottomSheet={openBottomSheet}
            setOpenBottomSheet={setOpenBottomSheet}
            handleNextStep={handleNextStep}
          />
        )}
      </FlexBox>
    </>
  )
}
