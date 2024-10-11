import FlexBox from '@/shared/ui/Flexbox'
import { ButtonMobile, TextField, TopBar } from '@eolluga/eolluga-ui'

interface SignupNameProps {
  name: string
  phone: string
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleNextStep: () => void
  handlePreviousStep: () => void
}

export default function SignupName({
  name,
  phone,
  handleNameChange,
  handlePhoneChange,
  handleNextStep,
  handlePreviousStep,
}: SignupNameProps) {
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
          onChange={handlePhoneChange}
          size="L"
          style="outlined"
          label="전화번호"
          placeholder="전화번호를 입력해주세요"
          value={phone}
        />
      </FlexBox>
      <FlexBox direction="col" className="w-full p-spacing-04 absolute bottom-4">
        <ButtonMobile
          size="L"
          style="primary"
          state="enabled"
          type="text"
          text1="시작하기"
          onClick={handleNextStep}
        />
      </FlexBox>
    </>
  )
}
