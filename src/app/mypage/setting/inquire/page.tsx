'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { TopBar, ButtonMobile } from '@eolluga/eolluga-ui'
import ByPhonePage from './byPhone'

export type InquireView = 'byPhone' | 'inquire'

export default function InquirePage() {
  const router = useRouter()
  const [currentView, setCurrentView] = useState<InquireView>('inquire')

  const handleChangeView = (value: InquireView) => {
    setCurrentView(value)
  }

  return (
    <div>
      {currentView === 'inquire' && (
        <>
          <div className="pt-4">
            <TopBar
              leftIcon="chevron_left_outlined"
              title="문의하기"
              onClickLeftIcon={() => router.push('/mypage/setting')}
            />
          </div>

          <div className="mt-4 gap-spacing-02 p-4">
            <h2 className="body-05-bold">무엇이든 도와드릴게요</h2>
            <p className="mt-2 body-02-medium text-text-secondary">고객님이 만족하실 때까지 최선을 다해 도와드릴게요</p>
          </div>

          <footer className="w-full py-3 px-4 fixed bottom-4">
            <div className="mb-4">
              <ButtonMobile
                size="L"
                style="secondary"
                type="icon-left"
                state="enabled"
                text1="카카오톡으로 문의하기"
                iconKey="kakaotalk_login"
              />
            </div>
            <ButtonMobile
              size="L"
              style="border"
              type="icon-left"
              state="enabled"
              text1="전화로 문의하기"
              iconKey="device_phone"
              onClick={() => setCurrentView('byPhone')}
            />
          </footer>
        </>
      )}
      {currentView === 'byPhone' && <ByPhonePage handleChangeView={handleChangeView} />}
    </div>
  )
}
