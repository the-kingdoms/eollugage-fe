import { sendRNFunction } from '@/shared'
import FlexBox from '@/shared/ui/Flexbox'
import Icon from '@eolluga/eolluga-ui/icon/Icon'
import Chip from '@eolluga/eolluga-ui/Input/Chip'

interface AddPhotoButtonProps {
  storeId: string
}

export default function AddPhotoButton({ storeId }: AddPhotoButtonProps) {
  const navigateToImageUploadPage = () => {
    sendRNFunction('navigateToImageUploadPage', { storeId, from: 'home' })
  }

  return (
    <button
      className="flex flex-row items-center mb-6 px-3 pb-[11px] pt-[9px] border border-border-title-01 rounded-lg w-full
           justify-between"
      type="button"
      onClick={navigateToImageUploadPage}
    >
      <FlexBox direction="col" className="gap-2 w-full items-start">
        <Chip size="S" state="enable" dismissible={false} label="권장" color="blue" readOnly />
        <div className="body-02-bold-compact">가게 사진을 손님들이 보고싶어 해요</div>
        <div className="body-01-medium-compact text-text-helper">가게 사진 추가하러 가기</div>
      </FlexBox>
      <Icon icon="chevron_right_outlined" size={20} className="fill-icon-secondary" />
    </button>
  )
}
