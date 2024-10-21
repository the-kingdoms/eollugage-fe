'use client'

import FlexBox from '@/shared/ui/Flexbox'
import { Icon } from '@eolluga/eolluga-ui'
import { useState } from 'react'
import { DutyT } from '@/entities/home/api/home'
import HomeBundle from './HomeBundle'

interface TodayWorkProps {
  workList: DutyT[]
}

export default function TodayWork({ workList }: TodayWorkProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const canNext = currentIndex + 2 < workList.length
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
  return (
    <HomeBundle
      title="금일 근무자"
      description="출근 시간순으로 나열되어 있습니다"
      rightChild={
        <FlexBox className="gap-5">
          <button
            type="button"
            onClick={prevSlide}
            disabled={canNext}
            className="disabled:cursor-not-allowed"
          >
            <Icon
              icon="chevron_left_outlined"
              size={20}
              className={canPrev ? 'fill-icon-primary' : 'fill-icon-disabled'}
            />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            disabled={canPrev}
            className="disabled:cursor-not-allowed"
          >
            <Icon
              icon="chevron_right_outlined"
              size={20}
              className={canNext ? 'fill-icon-primary' : 'fill-icon-disabled'}
            />
          </button>
        </FlexBox>
      }
      lowChild={
        <div className="flex flex-row gap-4 w-full">
          {workList.slice(currentIndex, currentIndex + 2).map(item => (
            <div key={item.id} className="flex flex-col gap-2 py-3 px-4 rounded bg-layer-01 w-full">
              <div className="w-full">
                <div className="body-04-medium-compact">{item.name}</div>
                <div className="body-01-medium-compact text-text-secondary">{item.position}</div>
              </div>
              <div className="body-02-medium-compact w-full">{item.startTime}</div>
            </div>
          ))}
        </div>
      }
    />
  )
}
