'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TopBar, Icon } from '@eolluga/eolluga-ui'
import LogoutModal from '@/features/setting/ui/LogoutModal'

export default function SettingsWidget({ storeId }: { storeId: string }) {
  const { push } = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="pt-4 pb-24">
      <TopBar
        leftIcon="chevron_left_outlined"
        title="설정"
        onClickLeftIcon={() => push(`/${storeId}/mypage`)}
      />
      <div>
        <ul className="flex flex-col gap-spacing-02 px-4 py-2">
          <li className="flex justify-between py-spacing-04">
            <button
              type="button"
              className="flex w-full justify-between"
              onClick={() => push(`/${storeId}/mypage/setting/alarm`)}
            >
              <span>알림</span>
              <Icon icon="chevron_right_outlined" />
            </button>
          </li>
        </ul>

        <div className="h-[12px] bg-Gray-10" />

        <ul className="flex flex-col gap-spacing-02 px-4 py-2">
          <li className="flex justify-between py-spacing-04">
            <button
              type="button"
              className="flex w-full justify-between"
              onClick={() => push(`/${storeId}/mypage/setting/privacy`)}
            >
              <span>개인정보 처리방침</span>
              <Icon icon="chevron_right_outlined" />
            </button>
          </li>
          <li className="flex justify-between py-spacing-04">
            <button
              type="button"
              className="flex w-full justify-between"
              onClick={() => push(`/${storeId}/mypage/setting/inquire`)}
            >
              <span>문의하기</span>
              <Icon icon="chevron_right_outlined" />
            </button>
          </li>
        </ul>

        <div className="h-[12px] bg-Gray-10" />

        <ul className="flex flex-col gap-spacing-02 px-4 py-2">
          <li className="flex justify-between py-spacing-04">
            <button
              type="button"
              className="flex w-full justify-between"
              onClick={() => push(`/${storeId}/mypage/setting/appInfo`)}
            >
              <span>앱 버전</span>
              <Icon icon="chevron_right_outlined" />
            </button>
          </li>
          <li className="flex justify-between py-spacing-04">
            <button
              type="button"
              className="flex w-full justify-between"
              onClick={() => push(`/${storeId}/mypage/setting/businessInfo`)}
            >
              <span>사업자 정보</span>
              <Icon icon="chevron_right_outlined" />
            </button>
          </li>
        </ul>

        <div className="h-[12px] bg-Gray-10" />

        <ul className="flex flex-col gap-spacing-02 px-4 py-2">
          <li className="flex justify-between py-spacing-04">
            <button
              type="button"
              className="flex w-full justify-between"
              onClick={() => setIsModalOpen(true)}
            >
              <span>로그아웃</span>
              <Icon icon="chevron_right_outlined" />
            </button>
          </li>
          <li className="flex justify-between py-spacing-04">
            <button
              type="button"
              className="flex w-full justify-between"
              onClick={() => push(`/${storeId}/mypage/setting/quit`)}
            >
              <span>탈퇴하기</span>
              <Icon icon="chevron_right_outlined" />
            </button>
          </li>
        </ul>
      </div>
      {isModalOpen && <LogoutModal setIsModalOpen={() => setIsModalOpen(false)} />}
    </div>
  )
}
