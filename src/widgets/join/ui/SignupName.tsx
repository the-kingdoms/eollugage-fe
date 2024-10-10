import FlexBox from '@/shared/ui/Flexbox'
import { ButtonMobile, TextField } from '@eolluga/eolluga-ui'

interface SignupNameProps {
  name: string
  phone: string
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleNextStep: () => void
}

export default function SignupName({
  name,
  phone,
  handleNameChange,
  handlePhoneChange,
  handleNextStep,
}: SignupNameProps) {
  return (
    <>
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
