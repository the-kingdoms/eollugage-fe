'use client'

import FlexBox from '@/shared/ui/Flexbox'
import { ButtonMobile, TopBar } from '@eolluga/eolluga-ui/Navigation'
import TextField from '@eolluga/eolluga-ui/Input/TextField'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ToastMessage } from '@/shared'
import { useAtom } from 'jotai'
import { RelationT } from '@/entities'
import { usePostLogin } from '../model/usePostLogin'
import { usePostOTP } from '../model/usePostOTP'
import { StoreT } from '../api/store'
import { memberIdAtom } from '../atoms/joinAtoms'
import { uid } from '@/widgets/join/atoms/joinAtoms'

interface SignupNameProps {
  name: string
  phone: string
  otp: number
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
  const [isOTP, setIsOTP] = useState(true) // 인증번호 유효성 에러 상태
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

    if (reason.includes('유효하지 않은 형식의 휴대폰 번호')) {
      setIsValid(false)
    } else {
      setIsValid(true)
      setErrorMessage(reason)
      setShowToast(true)
    }
  })

  const { mutate: postOTP } = usePostOTP({ name, phone }) // 인증번호 생성

  const handleStartClick = () => {
    if (otp !== 0) {
      // 인증번호까지 입력한 경우 이후 절차 기릿
      setIsOTP(true)
      mutate()
    } else {
      setIsValid(true)
      setButtonText('인증하기')
      postOTP()
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
          mode="outlined"
          label="이름"
          placeholder="이름을 입력해주세요"
          value={name}
          description=" "
        />
        <TextField
          onChange={handlePhoneChange}
          size="L"
          mode="outlined"
          label="전화번호"
          placeholder="전화번호를 입력해주세요"
          value={phone}
          state={isValid ? 'enable' : 'error'} // 전화번호 유효성 에러 시 에러 상태 표시
          description={isValid ? '' : '유효하지 않은 전화번호 형식입니다.'}
        />
        {isOTP && ( // 전화번호 인증 후 인증번호 입력 필드 출현
          <TextField
            onChange={handleOtpChange}
            size="L"
            mode="outlined"
            label="인증번호"
            placeholder="인증번호를 입력해주세요"
            value={phone}
            state={otp !== 0 ? 'enable' : 'error'}
            description={otp !== 0 ? '' : '유효하지 않은 인증번호입니다.'}
            inputMode="numeric"
          />
        )}
      </FlexBox>
      <FlexBox direction="col" className="w-full p-spacing-04 absolute bottom-4">
        <ButtonMobile
          size="L"
          mode="primary"
          state={getButtonState()}
          //state={name && phone ? 'enabled' : 'disabled'}
          type="text"
          text1={buttonText}
          //text1={isValid ? '인증번호 받기' : '인증하기'}
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
