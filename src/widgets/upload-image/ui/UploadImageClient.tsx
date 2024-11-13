'use client'

/* eslint-disable import/no-cycle */
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
import ImageTitle from './ImageTitle'
import ImageContainer from './ImageContainer'
import ImageControlButtons from './ImageControlButtons'
import ImageToastMessage from './ImageToastMessage'

interface ImageUploadScreenProps {
  page: 'home' | 'join'
  storeId: string
  initialImageName?: string
}

export default function ImageUploadClient({
  page,
  storeId,
  initialImageName,
}: ImageUploadScreenProps) {
  const [isSuccess] = useAtom(isSuccessAtom)
  const [imageName, setImageName] = useAtom(imageNameAtom)
  const [isLoading] = useAtom(isImageLoadingAtom)

  const router = useRouter()
  const { initImageUploadStatus, onImageLoadComplete } = useHandleImageStatus()
  const { data: presignedURL } = useGetPresignedURL(storeId, imageName)
  const { data: storeInfo } = useGetStoreInfo(storeId)
  // prettier-ignore
  const { data: imageInfo, isLoading: isLoadingImage } = useGetStoreImage( storeId, presignedURL, imageName )
  const { mutate: putStoreImageMutate } = usePutStoreImage(imageName, storeInfo, storeId)

  const onClickBackButton = () => {
    if (page === 'home') router.replace(`/${storeId}/home`)
    else router.replace('/join')
  }

  useEffect(() => {
    if (initialImageName) setImageName(initialImageName)
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
          {page === 'join' && <ImageTitle />}
          <ImageContainer
            isLoading={isLoading || isLoadingImage}
            page={page}
            storeInfo={storeInfo}
            imageData={imageInfo}
          />
        </FlexBox>
      </FlexBox>
      <ImageControlButtons storeId={storeId} imageInfo={storeInfo?.image} />
      <ImageToastMessage />
    </FlexBox>
  )
}
