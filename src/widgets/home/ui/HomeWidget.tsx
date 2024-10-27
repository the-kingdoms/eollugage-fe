'use client'

import Header from '@/widgets/home/ui/Header'
import FlexBox from '@/shared/ui/Flexbox'
import AddPhotoButton from '@/widgets/home/ui/AddPhotoButton'
import HomeNotice from '@/widgets/home/ui/HomeNotice'
import TodayWork from '@/widgets/home/ui/TodayWork'
import OrderList from '@/widgets/home/ui/OrderList'
import { formatCurrentDate } from '@/features'
import { useAtom } from 'jotai'
import { isOwnerAtom } from '@/shared'
import { storeInfoAtom, useGetStoreInfo } from '@/entities'
import { useEffect } from 'react'
import { useGetOrder } from '../model/useGetOrder'
import { useGetTodayDuty } from '../model/useGetTodyDuty'
import { noticeAtom } from '../atoms/homeAtoms'

interface HomeWidgetProps {
  storeId: string
}

export default function HomeWidget({ storeId }: HomeWidgetProps) {
  const [isOwner] = useAtom(isOwnerAtom)
  const [, setNotice] = useAtom(noticeAtom)
  const [, setStoreInfo] = useAtom(storeInfoAtom)

  const { data: orderList } = useGetOrder(storeId)
  const { data: workList } = useGetTodayDuty(storeId, formatCurrentDate())
  const { data: storeInfo, prefetchStoreInfo } = useGetStoreInfo(storeId)

  useEffect(() => {
    prefetchStoreInfo()
    if (storeInfo) {
      setNotice(storeInfo.internalNotice) // 삭제 예정
      setStoreInfo(storeInfo)
    }
  }, [storeInfo, prefetchStoreInfo])

  return (
    <>
      <Header title={storeInfo?.name || ''} storeCode={storeId.slice(0, 4)} />
      <div className="mt-[76px]">
        {isOwner ? <AddPhotoButton storeId={storeId} /> : null}
        <FlexBox direction="col" className="gap-8 mx-4">
          <HomeNotice storeId={storeId} notice={storeInfo?.internalNotice || ''} />
          <TodayWork workList={workList?.histories || []} />
          <OrderList storeId={storeId} orderList={orderList || []} />
        </FlexBox>
      </div>
    </>
  )
}
