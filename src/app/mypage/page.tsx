'use client'

// 마이페이지
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { HorizontalNav, Icon, Avatar } from '@eolluga/eolluga-ui'
import isOwnerAtom from '@/lib/globalState'
import PositionPage from './position'

export default function MyPage() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<string>('mypage')
  const [isOwner] = useAtom(isOwnerAtom)

  return (
    <div className="flex flex-col min-h-screen justify-between">
      {isOwner && currentPage === 'mypage' && (
        <main className="flex-grow">
          <div className="h-[32px] flex justify-end gap-4 mt-4 mr-4">
            <button onClick={() => setCurrentPage('position')}>
              <Icon icon="id" />
            </button>
            <button onClick={() => router.push('/mypage/setting')}>
              <Icon icon="gear" />
            </button>
          </div>
          <div className="flex p-spacing-04 gap-spacing-01 items-center">
            <Avatar icon="account" input="text" size="M" text="A" />
            <div className="ml-4">
              <h2 className="body-03-bold text-text-primary">얼루가게</h2>
              <p className="text-text-secondary body-01-bold">사장님</p>
            </div>
          </div>
        </main>
      )}

      {!isOwner && currentPage === 'mypage' && (
        <main className="flex-grow">
          <div className="h-[32px] flex justify-end gap-4 mt-4 mr-4">
            <button onClick={() => router.push('/mypage/setting')}>
              <Icon icon="gear" />
            </button>
          </div>
          <div className="flex p-spacing-04 gap-spacing-01 items-center">
            <Avatar icon="account" input="text" size="M" text="A" />
            <div className="ml-4">
              <h2 className="body-03-bold text-text-primary">얼루가게</h2>
              <p className="text-text-secondary body-01-bold">매니저</p>
            </div>
          </div>
        </main>
      )}
      {currentPage === 'mypage' && (
        <footer>
          <HorizontalNav
            items={[
              {
                icon: 'home',
                name: '홈',
                onClick: () => setCurrentPage('mypage')
              },
              {
                icon: 'people',
                name: '근무관리',
                onClick: () => {}
              },
              {
                icon: 'person_outlined',
                name: '마이',
                onClick: () => setCurrentPage('mypage')
              }
            ]}
          />
        </footer>
      )}
      {isOwnerAtom && currentPage === 'position' && (
        <PositionPage setCurrentPage={() => setCurrentPage('mypage')} />
      )}
    </div>
  )
}
