import { ChangeEvent, useCallback, useState } from 'react'
import { TopBar, TextField, ButtonMobile, SnackBar } from '@eolluga/eolluga-ui'
import { InquireView } from '@/types/myPageTypes'

export default function ByPhonePage({
  handleChangeView,
}: {
  handleChangeView: (value: InquireView) => void
}) {
  const [isClicked, setIsClicked] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('010-4000-9842')

  const handleSnackBarClose = useCallback(() => {
    setIsClicked(false)
  }, [])

  const handleCopyPhoneNumber = useCallback(() => {
    setIsClicked(!isClicked)
  }, [isClicked])

  const handleInputChange = (value: string) => {
    setPhoneNumber(value)
  }

  return (
    <div className="pt-4">
      <TopBar
        leftIcon="close"
        title=""
        onClickLeftIcon={() => handleChangeView('inquire')}
      />
      <div className="mt-4 gap-spacing-02 p-4">
        <h2 className="body-05-bold">전화로 문의하기</h2>
        <div className="pt-spacing-02 body-02-medium text-text-secondary">
          <p>2018년 10월 18일부터 산업안전보건법에 따라</p>
          <p>고객응대근로자 보호조치를 시행하고 있습니다.</p>
          <p>고객응대근로자에게 폭언, 폭행 등을 하지 말아주세요.</p>
        </div>
      </div>

      <div className="px-4 pt-12">
        <TextField
          value={phoneNumber}
          label="고객센터 번호"
          onChange={(e) => handleInputChange(e.target.value)}
          size="L"
          style="outlined"
        />
      </div>

      <footer className="w-full py-3 px-4 fixed bottom-4">
        <div className="pb-4">
          <SnackBar
            message="고객센터 번호를 복사했어요"
            open={isClicked}
            onClose={handleSnackBarClose}
          />
        </div>
        <ButtonMobile
          style="primary"
          size="L"
          type="text"
          state="enabled"
          text1="번호 복사하기"
          onClick={handleCopyPhoneNumber}
        />
      </footer>
    </div>
  )
}
