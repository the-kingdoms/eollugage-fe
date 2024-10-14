'use client'

import HomeBundle from '@/features/home/ui/HomeBundle'
import { Icon, Scrim, Dialog } from '@eolluga/eolluga-ui'
import Header from '@/widgets/home/ui/Header'
import FlexBox from '@/shared/ui/Flexbox'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { isOwnerAtom } from '@/shared/atoms/globalAtom'
import AddPhotoButton from '@/features/home/ui/AddPhotoButton'
import HomeNotice from '@/features/home/ui/HomeNotice'
import TodayWork from '@/features/home/ui/TodayWork'

const fooddata = [
  {
    id: 1,
    title: '얼루가게',
    description: '매주 화요일마다 발주 부탁드립니다. 매주 화요일마다 발주 부탁드립니다.',
  },
  {
    id: 2,
    title: '얼루가게',
    description: '매주 화요일마다 발주 부탁드립니다.',
  },
]

export default function HomePage() {
  const [open, setOpen] = useState(false)
  const [nowModal, setNowModal] = useState<{ title: string; description: string } | null>(null)
  const router = useRouter()
  const [isOwner] = useAtom(isOwnerAtom)

  const handleOpen = (item: { title: string; description: string }) => {
    setNowModal(item)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setNowModal(null)
  }

  return (
    <>
      <Header />
      <div className="mt-[76px]">
        {isOwner && <AddPhotoButton />}
        <FlexBox direction="col" className="gap-8 mx-4">
          <HomeNotice />
          <TodayWork />
          <HomeBundle
            title="발주 리스트"
            description="발주 항목을 수정하려면 클릭해주세요"
            rightChild={
              <button
                onClick={() => {
                  router.push('/home/order')
                }}
              >
                <Icon icon="add" size={24} />
              </button>
            }
            lowChild={
              <div className="grid grid-cols-2 gap-4 w-full">
                {fooddata.map(item => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-2 p-4 border border-border-subtle-01 rounded"
                    onClick={() => handleOpen(item)}
                    aria-hidden="true"
                  >
                    <div className="body-04-medium-compact w-full">{item.title}</div>
                    <div className="body-03-medium-compact text-text-secondary w-full line-clamp-2">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            }
          />
        </FlexBox>
        {open && nowModal && (
          <Scrim
            className="fixed inset-0 z-40 flex items-center justify-center"
            onClick={handleClose}
          >
            <Dialog
              open={open}
              onClose={handleClose}
              title={nowModal.title}
              description={nowModal.description}
              dismissible
            />
          </Scrim>
        )}
      </div>
    </>
  )
}
