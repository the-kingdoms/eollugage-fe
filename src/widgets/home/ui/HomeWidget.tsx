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
import { storeNameAtom } from '@/shared/atoms/globalAtom'
import { useEffect } from 'react'
import { useGetOrder } from '../model/useGetOrder'
import { useGetTodayDuty } from '../model/useGetTodyDuty'
import { useGetStoreDetail } from '../model/useGetStoreDetail'
import { noticeAtom } from '../atoms/homeAtoms'

interface HomeWidgetProps {
  storeId: string
}

export default function HomeWidget({ storeId }: HomeWidgetProps) {
  const [isOwner] = useAtom(isOwnerAtom)
  const [storeName] = useAtom(storeNameAtom)
  const [notice] = useAtom(noticeAtom)

  const { data: orderList } = useGetOrder(storeId)
  const { data: workList } = useGetTodayDuty(storeId, formatCurrentDate())
  const { mutate: details } = useGetStoreDetail(storeId)

  useEffect(() => {
    details()
  }, [details])

  return (
    <>
      <Header title={storeName || ''} />
      <div className="mt-[76px]">
        {isOwner && <AddPhotoButton storeId={storeId} />}
        <FlexBox direction="col" className="gap-8 mx-4">
          <HomeNotice storeId={storeId} notice={notice || ''} />
          <TodayWork workList={workList?.histories || []} />
          <OrderList storeId={storeId} orderList={orderList || []} />
        </FlexBox>
      </div>
    </>
  )
}
