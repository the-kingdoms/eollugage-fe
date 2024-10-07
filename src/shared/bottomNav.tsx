import { HorizontalNav } from '@eolluga/eolluga-ui'
import React from 'react'

const navItem = [
  {
    name: '홈',
    icon: 'home',
    // eslint-disable-next-line no-console
    onClick: () => console.log(1),
  },
  {
    name: '근무 관리',
    icon: 'people',
    // eslint-disable-next-line no-console
    onClick: () => console.log(1),
  },
  {
    name: '마이',
    icon: 'person_outlined',
    // eslint-disable-next-line no-console
    onClick: () => console.log(1),
  },
]

export default function BottomNav() {
  return (
    <>
      <div className="w-full min-h-[84px]" />
      <div className="fixed inset-x-0 bottom-0 w-full">
        <HorizontalNav items={navItem} />
      </div>
    </>
  )
}
