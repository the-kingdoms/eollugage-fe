'use client'

import BottomNav from '@/component/shared/bottomNav'
import HomeBundle from '@/component/main/HomeBundle'
import { Chip, Icon, TextField } from '@eolluga/eolluga-ui'
import Header from '@/component/shared/Header'
import FlexBox from '@/component/shared/flexbox'
import { useRouter } from 'next/navigation'
import { Scrim } from '@eolluga/eolluga-ui'
import { Dialog } from '@eolluga/eolluga-ui'
import { ChangeEvent, useState } from 'react'

//임시 데이터
const workdata = [
  {
    store: '얼루가게',
    position: '매니저',
    time: '08:00',
  },
  {
    store: '매장 1',
    position: '직원',
    time: '09:00',
  },
  {
    store: '매장 2',
    position: '직원',
    time: '10:00',
  },
  {
    store: '매장 3',
    position: '매니저',
    time: '11:00',
  },
]

//임시 데이터
const fooddata = [
  {
    title: '얼루가게',
    description: '매주 화요일마다 발주 부탁드립니다. 매주 화요일마다 발주 부탁드립니다.',
  },
  {
    title: '얼루가게',
    description: '매주 화요일마다 발주 부탁드립니다.',
  },
]

export default function HomePage() {
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const router = useRouter()

  const canNext = currentIndex + 2 < workdata.length
  const canPrev = currentIndex > 0

  const nextSlide = () => {
    if (canNext) {
      setCurrentIndex(prevIndex => prevIndex + 2)
    }
  }

  const prevSlide = () => {
    if (canPrev) {
      setCurrentIndex(prevIndex => prevIndex - 2)
    }
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Header />
      <div className="mt-[76px]">
        <div
          className="flex flex-row items-center mx-4 mb-6 px-3 pb-[11px] pt-[9px] border border-border-title-01 rounded-lg
           justify-between"
          onClick={() => {
            router.push('/home') // 경로 수정
          }}
        >
          <FlexBox direction="col" className="gap-2 w-full items-start">
            <Chip size="S" state="enable" dismissible={false} label={'권장'} color={'blue'} readOnly={true} />
            <div className="body-02-bold-compact">가게 사진을 손님들이 보고싶어 해요</div>
            <div className="body-01-medium-compact text-text-helper">가게 사진 추가하러 가기</div>
          </FlexBox>
          <Icon icon="chevron_right_outlined" size={20} className="fill-icon-secondary" />
        </div>
        <FlexBox direction="col" className="gap-8 mx-4">
          <HomeBundle
            title="가게 공지"
            rightChildren={
              <div
                onClick={() => {
                  router.push('/home/notice')
                }}
              >
                <Icon icon="chevron_right_outlined" size={20} />
              </div>
            }
            underChildren={
              <TextField
                size="L"
                placeholder="공지가 아직 없어요"
                value=""
                onChange={(e: ChangeEvent<HTMLInputElement>) => {}}
                style="outlined"
              />
            }
          />
          <HomeBundle
            title="금일 근무자"
            description="출근 시간순으로 나열되어 있습니다"
            rightChildren={
              <FlexBox className="gap-5">
                <div onClick={prevSlide}>
                  <Icon
                    icon="chevron_left_outlined"
                    size={20}
                    className={canPrev ? 'fill-icon-primary' : 'fill-icon-disabled'}
                  />
                </div>
                <div onClick={nextSlide}>
                  <Icon
                    icon="chevron_right_outlined"
                    size={20}
                    className={canNext ? 'fill-icon-primary' : 'fill-icon-disabled'}
                  />
                </div>
              </FlexBox>
            }
            underChildren={
              <div className="flex flex-row gap-4 w-full">
                {workdata.slice(currentIndex, currentIndex + 2).map((item, index) => (
                  <FlexBox direction="col" className="gap-2 py-3 px-4 rounded bg-layer-01 w-full">
                    <div className="w-full">
                      <div className="body-04-medium-compact">{item.store}</div>
                      <div className="body-01-medium-compact text-text-secondary">{item.position}</div>
                    </div>
                    <div className="body-02-medium-compact w-full">{item.time}</div>
                  </FlexBox>
                ))}
              </div>
            }
          />
          <HomeBundle
            title="발주 리스트"
            description="발주 항목을 수정하려면 클릭해주세요"
            rightChildren={
              <div
                onClick={() => {
                  router.push('/home/order')
                }}
              >
                <Icon icon="add" size={24} />
              </div>
            }
            underChildren={
              <div className="grid grid-cols-2 gap-4 w-full">
                {fooddata.map((item, index) => (
                  <div className="flex flex-col gap-2 p-4 border border-border-subtle-01 rounded" onClick={handleOpen}>
                    <div className="body-04-medium-compact w-full">{item.title}</div>
                    <div className="body-03-medium-compact text-text-secondary w-full">{item.description}</div>
                  </div>
                ))}
              </div>
            }
          />
        </FlexBox>
        <BottomNav />
        {open && (
          <Scrim className="fixed inset-0 z-40 flex items-center justify-center" onClick={handleClose}>
            <Dialog
              open={open}
              onClose={handleClose}
              title="양배추 1kg"
              description="매주 화요일마다 발주 부탁드립니다. 매주 화요일마다 발주 부탁드립니다."
              dismissible={true}
              leftText={''}
              rightText={''}
            />
          </Scrim>
        )}
      </div>
    </>
  )
}
