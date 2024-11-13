import { Flexbox, sendRNFunction } from '@/shared'
import { ButtonMobile } from '@eolluga/eolluga-ui'
import Link from 'next/link'
import { StoreInfoT } from '@/entities'
import useHandleStoreImage from '../model/useHandleStoreImage'
import { usePutStoreImage } from '../model/usePutStoreImage'
import ImageErrorDialog from './ImageErrorDialog'

interface ImageControlButtonsProps {
  storeId: string
  imageInfo: undefined | string
  storeInfo: undefined | StoreInfoT
}

export default function ImageControlButtons({
  storeId,
  imageInfo,
  storeInfo,
}: ImageControlButtonsProps) {
  const { initImageUploadStatus } = useHandleStoreImage()
  const { mutate: putStoreImageMutate } = usePutStoreImage(imageInfo, storeInfo, storeId)

  const onClickSelectButton = () => {
    initImageUploadStatus()
    sendRNFunction('accessGallery', storeId)
  }

  const onClickLeavePage = () => putStoreImageMutate()

  return (
    <Flexbox direction="col" className="w-full gap-spacing-02 py-spacing-03 px-spacing-04">
      {imageInfo === undefined || imageInfo === 'NONE' ? (
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
      ) : (
        <Flexbox direction="col" className="w-full gap-spacing-02 py-spacing-03 px-spacing-04">
          <Link
            href={`/${storeId}/home`}
            replace
            onClick={onClickLeavePage}
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
      )}
      <ImageErrorDialog onRetry={onClickSelectButton} />
    </Flexbox>
  )
}
