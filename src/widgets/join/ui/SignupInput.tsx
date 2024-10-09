/* eslint-disable no-nested-ternary */

'use client'

import { isOwnerAtom, loginMethodAtom } from '@/shared/atoms/globalAtom'
import { ButtonMobile, TextField } from '@eolluga/eolluga-ui'
import { useAtom } from 'jotai'
import React, { useState } from 'react'
import FlexBox from '@/shared/ui/Flexbox'
import { stepAtom } from '../atoms/joinAtoms'

export default function SignupInput() {
  const [name, setName] = useState('얼루가')
  const [storeCode, setStoreCode] = useState<string>('')
  const [store, setStore] = useState('')

  const [valid, setValid] = useState(false)

  const [loginMethod] = useAtom(loginMethodAtom)
  const [isOwner] = useAtom(isOwnerAtom)
  const [step, setStep] = useAtom(stepAtom)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)

  const handleStoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValid(true)
    setStore(e.target.value)
  }

  const handleStoreCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValid(true)
    setStoreCode(e.target.value)
  }

  const getGreetingText = () => {
    if (step === 1) {
      return loginMethod === 'kakao' ? (
        `${name}이신가요?`
      ) : isOwner ? (
        <>
          사장님의 <br />
          이름을 입력해주세요
        </>
      ) : (
        <>이름을 입력해주세요</>
      )
    }
    return isOwner ? (
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
  }

  const handleNextStep = () => {
    setStep(prevStep => prevStep + 1) // 동적으로 다음 스텝으로 이동
  }

  return (
    <>
      <div className="w-full head-02-bold h-[52px] px-spacing-04 text-left mt-spacing-06 mb-[66px]">
        {getGreetingText()}
      </div>
      <FlexBox direction="col" className="w-full px-spacing-04 gap-spacing-08">
        {step === 2 && (
          <TextField
            onChange={isOwner ? handleStoreChange : handleStoreCodeChange}
            size="L"
            style="underlined"
            label={isOwner ? '가게 이름' : '근무 중인 가게 코드'}
            placeholder={isOwner ? '가게 이름을 입력해주세요' : '가게 코드를 입력해주세요'}
            value={isOwner ? store : storeCode}
          />
        )}
        <TextField
          onChange={handleNameChange}
          size="L"
          style="underlined"
          label="이름"
          placeholder="이름을 입력해주세요"
          value={name}
        />
        <FlexBox direction="col" className="w-full p-spacing-04 absolute bottom-4">
          {step === 1 && (
            <ButtonMobile
              size="L"
              style="primary"
              state="enabled"
              type="text"
              text1={loginMethod === 'kakao' ? '맞아요' : '다음'}
              onClick={handleNextStep}
            />
          )}
          {step === 2 && valid && (
            <ButtonMobile
              size="L"
              style="primary"
              state="enabled"
              type="text"
              text1={isOwner ? '가게 코드 받기' : '코드 승인 받기'}
              onClick={handleNextStep}
            />
          )}
        </FlexBox>
      </FlexBox>
    </>
  )
}
