import { Flexbox, sendRNFunction } from '@/shared'
import { ButtonMobile } from '@eolluga/eolluga-ui'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useHandleStoreImage from '../model/useHandleStoreImage'

interface ImageControlButtonsProps {
  storeId: string
  imageInfo: undefined | string
}

export default function ImageControlButtons({ storeId, imageInfo }: ImageControlButtonsProps) {
  const router = useRouter()
  const { initImageUploadStatus } = useHandleStoreImage()

  const onClickSelectButton = () => {
    initImageUploadStatus()
    sendRNFunction('accessGallery', storeId)
  }

  if (imageInfo === undefined || imageInfo === 'NONE')
    return (
      <Flexbox direction="col" className="w-full gap-spacing-02 py-spacing-03 px-spacing-04">
        <ButtonMobile
          size="L"
          style="primary"
          type="text"
          state="enabled"
          text1="앨범에서 선택하기"
          onClick={onClickSelectButton}
        />
        <Flexbox className="w-full justify-center">
          <Link
            href={`/${storeId}/home`}
            replace
            className="py-spacing-03 label-02-bold text-text-disabled"
          >
            나중에 추가하기
          </Link>
        </Flexbox>
      </Flexbox>
    )

  return (
    <Flexbox direction="col" className="w-full gap-spacing-02 py-spacing-03 px-spacing-04">
      <Link
        href={`/${storeId}/home`}
        replace
        className="flex label-03-bold w-full h-[64px] py-spacing-05 px-spacing-07 gap-spacing-04 flex justify-center items-center bg-button-primary text-text-on-color rounded-radius-04"
      >
        가게 완성하기
      </Link>
      <Flexbox className="w-full justify-center">
        <button
          type="button"
          onClick={onClickSelectButton}
          className="py-spacing-03 label-02-bold text-text-disabled"
        >
          사진 바꾸기
        </button>
      </Flexbox>
    </Flexbox>
  )
}
