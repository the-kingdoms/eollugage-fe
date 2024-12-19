'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FlexBox from '@/shared/ui/Flexbox'
import { ButtonMobile, TopBar, TextField } from '@eolluga/eolluga-ui'
import { ToastMessage } from '@/shared'
import { useAtom } from 'jotai'
import { uid, memberIdAtom } from '@/widgets/join/atoms/joinAtoms' // 중복 제거
import { RelationT } from '@/entities'

import { OTPField } from './OTP/OTPField' // 상대 경로는 마지막에 배치
import { usePostLogin } from '../model/usePostLogin'
import { usePostOTP } from '../model/usePostOTP'
import { StoreT } from '../api/store'
import { AxiosError } from 'axios'

interface SignupNameProps {
  name: string
  phone: string
  otp: string
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleOtpChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleNextStep: () => void
  handlePreviousStep: () => void
}

export default function SignupName({
  name,
  phone,
  otp,
  handleNameChange,
  handlePhoneChange,
  handleOtpChange,
  handleNextStep,
  handlePreviousStep,
}: SignupNameProps) {
  const [buttonText, setButtonText] = useState('인증번호 받기')
  const [isValid, setIsValid] = useState(true) // 전화번호 유효성 에러 상태
  const [isValidOTP, setIsValidOTP] = useState(true) // 인증번호 유효성 에러 상태
  const [userId] = useAtom(uid)
  const [showToast, setShowToast] = useState(false)
  const [errorMessage, setErrorMessage] = useState('') // 토스트 메시지의 에러 내용
  const [, setMemberId] = useAtom(memberIdAtom)
  const router = useRouter()

  const handleStoreListCheck = (
    storeList: StoreT[],
    relationList: RelationT[],
    memberId: string,
  ) => {
    setMemberId(memberId)
    if (storeList && storeList.length > 0) router.push(`/${storeList[0].storeId}/home`)
    else if (relationList && relationList.length > 0)
      router.push(`/${relationList[0].storeId}/home`)
    else handleNextStep()
  }

  const { mutate } = usePostLogin({ userId, otp }, handleStoreListCheck, error => {
    const reason = error?.response?.data?.reason || '로그인에 실패했습니다.'

    if (reason.includes('유효하지 않은')) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
    setErrorMessage(reason)
    setShowToast(true)
  })

  // 전화번호 유효성 검사 함수
  const validatePhoneNumber = (phoneNumber: string): boolean => {
    const phoneRegex = /^[0-9]{10,11}$/
    return phoneRegex.test(phoneNumber)
  }

  const { mutate: postOTP } = usePostOTP({ name, phone }) // 인증번호 생성

  const handleStartClick = () => {
    if (!validatePhoneNumber(phone)) {
      // 전화번호 유효성 검사 실패
      setIsValid(false)
      setErrorMessage('유효하지 않은 전화번호 형식입니다.')
      setShowToast(true)
      return
    }

    setIsValid(true)

    if (otp !== '') {
      // 인증번호까지 입력한 경우 이후 절차 진행
      setIsValidOTP(true)
      mutate()
    } else {
      // 인증번호 생성 요청
      setButtonText('인증하기')
      postOTP(undefined, {
        onError: error => {
          // 인증번호 요청 실패 처리
          const reason = String(error.cause)
          setErrorMessage(reason)
          setShowToast(true)
        },
      })
    }
  }

  const getButtonState = () => {
    if (buttonText === '인증하기' && name && phone && otp) {
      return 'enabled'
    }
    if (buttonText === '인증번호 받기' && name && phone) {
      return 'enabled'
    }
    return 'disabled'
  }

  const handlePhoneChangeWrap = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value
    handlePhoneChange(e)

    // 상태 초기화 및 버튼 상태 변경 처리
    if (newPhone !== phone) {
      setIsValid(true)
      setButtonText('인증번호 받기')
      setIsValidOTP(true)
      handleOtpChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)
    }
  }

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
          onChange={handlePhoneChangeWrap}
          size="L"
          style="outlined"
          label="전화번호"
          placeholder="전화번호를 입력해주세요"
          value={phone}
          state={isValid ? 'enable' : 'error'} // 전화번호 유효성 에러 시 에러 상태 표시
          description={isValid ? '' : '유효하지 않은 전화번호 형식입니다.'}
        />
        {phone && buttonText === '인증하기' && (
          <OTPField
            onChange={handleOtpChange}
            size="L"
            mode="outlined"
            label="인증번호"
            placeholder="인증번호를 입력해주세요"
            inputMode="numeric"
            value={otp}
            state={isValidOTP ? 'enable' : 'error'} // 유효성 검사 상태 반영
            description={isValidOTP ? '' : '유효하지 않은 인증번호입니다.'}
          />
        )}
      </FlexBox>
      <FlexBox direction="col" className="w-full p-spacing-04 absolute bottom-4">
        <ButtonMobile
          size="L"
          style="primary"
          state={getButtonState()}
          type="text"
          text1={buttonText}
          onClick={handleStartClick}
        />
      </FlexBox>

      {showToast && (
        <ToastMessage
          message={errorMessage}
          icon="warning"
          open={showToast}
          setOpen={setShowToast}
        />
      )}
    </>
  )
}
