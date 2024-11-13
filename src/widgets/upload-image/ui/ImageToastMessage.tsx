import { useAtom } from 'jotai'
import { imageToastAtom } from '../atoms/uploadImageAtoms'
import { ToastMessage, sendRNFunction } from '@/shared'

export default function ImageToastMessage() {
  const [isShownToast, setIsShownToast] = useAtom(imageToastAtom)

  if (isShownToast)
    return (
      <ToastMessage
        icon="warning"
        open={isShownToast}
        setOpen={setIsShownToast}
        message="다시 시도해주세요."
      />
    )

  return null
}
