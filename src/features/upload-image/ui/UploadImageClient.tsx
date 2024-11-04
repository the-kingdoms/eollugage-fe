'use client'

import { useEffect, useState } from 'react'
import FlexBox from '@/shared/ui/Flexbox'
import { useRouter } from 'next/navigation'
import { ButtonMobile, Icon, TopBar } from '@eolluga/eolluga-ui'
import Link from 'next/link'
import Image from 'next/image'
import { ToastMessage, sendRNFunction } from '@/shared'
import { OrbitProgress } from 'react-loading-indicators'
import storeDefaultImage from '@public/image/store_default_image.png'
import { useAtom } from 'jotai'
import { useGetStoreInfo } from '@/entities'
import { usePutStoreImage } from '../model/usePutStoreImage'
import { useGetStoreImage } from '../model/useGetStoreImage'
import { useGetPresignedURL } from '../model/useGetPresignedURL'
import useHandleImageStatus from '../model/useHandleStoreImage'
import { imageNameAtom, isImageLoadingAtom, isSuccessAtom } from '../atoms/uploadImageAtoms'

interface ImageUploadScreenProps {
  page: 'home' | 'join'
  storeId: string
  initialImageName: string
}

export default function ImageUploadClient({
  page,
  storeId,
  initialImageName,
}: ImageUploadScreenProps) {
  const [isSuccess] = useAtom(isSuccessAtom)
  const [imageName, setImageName] = useAtom(imageNameAtom)
  const [isLoading] = useAtom(isImageLoadingAtom)
  const [isShownToast, setIsShownToast] = useState<boolean>(false)

  const router = useRouter()
  const { initImageUploadStatus, onImageLoadComplete } = useHandleImageStatus()
  const { data: presignedURL } = useGetPresignedURL(storeId, imageName)
  const { data: storeInfo } = useGetStoreInfo(storeId)
  // prettier-ignore
  const { data: imageInfo, isLoading: isLoadingImage } = useGetStoreImage( storeId, presignedURL, imageName )
  const { mutate: putStoreImageMutate } = usePutStoreImage(imageName, storeInfo, storeId)

  const onClickBackButton = () => router.back()

  const onClickSelectButton = () => {
    setIsShownToast(false)
    initImageUploadStatus()
    sendRNFunction('accessGallery', storeId)
  }

  useEffect(() => {
    if (isSuccess === true) putStoreImageMutate()
    else if (isSuccess === false) setIsShownToast(true)
  }, [isSuccess])

  useEffect(() => {
    setImageName(initialImageName)
  }, [])

  return (
    <FlexBox direction="col" className="w-full h-full">
      <TopBar
        leftIcon="chevron_left_outlined"
        title={page === 'home' ? '가게 대표 사진 추가' : ''}
        onClickLeftIcon={onClickBackButton}
      />
      <FlexBox
        direction="col"
        className="w-full h-full px-spacing-04 pt-spacing-06 justify-between"
      >
        <FlexBox direction="col" className="w-full">
          {page === 'join' && (
            <div className="w-full head-02-bold mt-spacing-06">
              가게 메뉴판에 사용할
              <br />
              대표 이미지를 추가해주세요
            </div>
          )}
          <FlexBox
            direction="col"
            className={`w-full gap-spacing-03 ${page === 'join' && 'mt-12'}`}
          >
            <div className="w-full aspect-[3/2] max-h-[400px] relative overflow-hidden">
              {storeInfo?.image === 'NONE' || imageInfo === undefined || imageInfo.length === 0 ? (
                <Image
                  alt="store default image"
                  src={storeDefaultImage}
                  style={{ objectFit: 'contain', width: '100%' }}
                  onLoad={onImageLoadComplete}
                />
              ) : (
                <Image
                  alt="store image"
                  src={imageInfo}
                  className="w-full h-full"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  fill
                  onLoad={onImageLoadComplete}
                />
              )}
              {(isLoadingImage || isLoading) && (
                <FlexBox className="absolute bg-[#161616]/10 inset-0 justify-center">
                  <OrbitProgress color="#fff" size="small" text="" textColor="" />
                </FlexBox>
              )}
            </div>
            <FlexBox className="items-start w-full gap-spacing-04">
              <Icon icon="info_circle_filled" size={20} className="fill-support-info shrink-0" />
              <div className="w-full body-01-medium text-text-helper">
                예시처럼 매장의 전체 공간이 보이는 사진을 선택해주세요.
                <br />
                손님들이 있는 사진보다 손님들이 없는 사진을 선택해주세요.
              </div>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <FlexBox direction="col" className="w-full gap-spacing-02 py-spacing-03 px-spacing-04">
        <ButtonMobile
          size="L"
          style="primary"
          type="text"
          state="enabled"
          text1="앨범에서 선택하기"
          onClick={onClickSelectButton}
        />
        <FlexBox className="w-full justify-center">
          <Link
            href={`/${storeId}/home`}
            className="py-spacing-03 label-02-bold text-text-disabled"
          >
            나중에 추가하기
          </Link>
        </FlexBox>
      </FlexBox>
      {isShownToast && (
        <ToastMessage
          icon="warning"
          open={isShownToast}
          setOpen={setIsShownToast}
          message="다시 시도해주세요."
        />
      )}
    </FlexBox>
  )
}
