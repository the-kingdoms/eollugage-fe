'use client'

import { useEffect, useState } from 'react'
import FlexBox from '@/shared/ui/Flexbox'
import { useRouter } from 'next/navigation'
import { ButtonMobile, Icon, TopBar } from '@eolluga/eolluga-ui'
import Link from 'next/link'
import Image from 'next/image'
import { ToastMessage, sendRNFunction, storeInfoAtom } from '@/shared'
import { OrbitProgress } from 'react-loading-indicators'
import storeDefaultImage from '@public/image/store_default_image.png'
import { useAtom } from 'jotai'
import { usePutStoreImage } from '../model/usePutStoreImage'
import { ImageUploadResultT } from '../types/imageUploadType'
import { useGetStoreImage } from '../model/useGetStoreImage'

interface ImageUploadScreenProps {
  page: 'home' | 'join'
  storeId: string
}

export default function ImageUploadScreen({ page, storeId }: ImageUploadScreenProps) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showToast, setShowToast] = useState<boolean>(false)
  const [imageName, setImageName] = useState<string | undefined>(undefined)

  const [storeInfo] = useAtom(storeInfoAtom)

  const { data: imageInfo, isLoading: isLoadingImage } = useGetStoreImage(
    storeId,
    storeInfo && storeInfo?.image.length > 0 ? storeInfo?.image : imageName,
  )
  const { mutate: putStoreImageMutate } = usePutStoreImage(imageName, storeInfo, storeId)

  const onClickBackButton = () => router.back()

  const onClickSelectButton = () => {
    setShowToast(false)
    sendRNFunction('accessGallery', storeId)
    setIsLoading(true)
  }

  const onMessageEvent = (e: MessageEvent) => {
    e.stopPropagation()
    const message: { type: string; data: ImageUploadResultT } = JSON.parse(String(e.data))

    if (message.type === 'getImageUploadResult') {
      // eslint-disable-next-line prefer-destructuring
      const data = message.data
      if (!data.isSuccess) {
        setIsLoading(false)
        setShowToast(true)
      } else if (data.fileFullName) {
        setImageName(data.fileFullName)
        putStoreImageMutate(undefined, {
          onError: () => {
            setIsLoading(false)
            setShowToast(true)
          },
        })
      }
    }
  }

  useEffect(() => {
    window.addEventListener('message', onMessageEvent)
    document.addEventListener('message', onMessageEvent as EventListener)
  }, [])

  return (
    <FlexBox direction="col" className="w-full h-full">
      <TopBar
        leftIcon="chevron_left_outlined"
        title={page === 'home' ? '가게 대표 사진 추가' : ''}
        onClickLeftIcon={onClickBackButton}
      />
      <FlexBox direction="col" className="w-full h-full px-4 pt-6 justify-between">
        <FlexBox direction="col" className="w-full">
          {page === 'join' && (
            <div className="w-full head-02-bold mt-6">
              가게 메뉴판에 사용할
              <br />
              대표 이미지를 추가해주세요
            </div>
          )}
          <FlexBox
            direction="col"
            className={`w-full gap-spacing-03 ${page === 'join' && 'mt-12'}`}
          >
            <div className="w-full aspect-[3/2] max-h-[400px] relative">
              {storeInfo?.image.length === 0 || imageInfo === undefined ? (
                <Image
                  alt="store default image"
                  src={storeDefaultImage}
                  style={{ objectFit: 'contain', width: '100%' }}
                  onLoadingComplete={() => setIsLoading(false)}
                />
              ) : (
                <Image
                  alt="store image"
                  src={imageInfo}
                  className="w-full"
                  width={100}
                  height={100}
                  style={{ objectFit: 'cover' }}
                  onLoadingComplete={() => setIsLoading(false)}
                />
              )}
              {(isLoadingImage || isLoading) && (
                <FlexBox className="absolute bg-[#161616]/10 inset-0 justify-center">
                  <OrbitProgress color="#fff" size="small" text="" textColor="" />
                </FlexBox>
              )}
            </div>
            <FlexBox className="items-start w-full gap-4">
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
      <FlexBox direction="col" className="w-full gap-2 py-3 px-4">
        <ButtonMobile
          size="L"
          style="primary"
          type="text"
          state="enabled"
          text1="앨범에서 선택하기"
          onClick={onClickSelectButton}
        />
        <FlexBox className="w-full justify-center">
          <Link href={`/${storeId}/home`} className="py-3 label-02-bold text-text-disabled">
            나중에 추가하기
          </Link>
        </FlexBox>
      </FlexBox>
      {showToast && (
        <ToastMessage
          icon="warning"
          open={showToast}
          setOpen={setShowToast}
          message="다시 시도해주세요."
        />
      )}
    </FlexBox>
  )
}
