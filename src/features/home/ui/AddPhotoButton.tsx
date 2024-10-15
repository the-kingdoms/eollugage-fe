'use client'

import FlexBox from '@/shared/ui/Flexbox'
import { Icon } from '@eolluga/eolluga-ui'
import { useRouter } from 'next/navigation'

export default function AddPhotoButton() {
  const router = useRouter()
  return (
    <div
      className="flex flex-row items-center mx-4 mb-6 px-3 pb-[11px] pt-[9px] border border-border-title-01 rounded-lg
           justify-between"
      onClick={() => {
        router.push('/home/upload-image')
      }}
      aria-hidden="true"
    >
      <FlexBox direction="col" className="gap-2 w-full items-start">
        <div className="body-02-bold-compact">가게 사진을 손님들이 보고싶어 해요</div>
        <div className="body-01-medium-compact text-text-helper">가게 사진 추가하러 가기</div>
      </FlexBox>
      <Icon icon="chevron_right_outlined" size={20} className="fill-icon-secondary" />
    </div>
  )
}
