'use client'

import { Icon } from '@eolluga/eolluga-ui'
import Link from 'next/link'
import useJoin from '../hooks/useJoin'
import { useLoginToken } from '../hooks/useLoginToken'

export default function LoginButton() {
  const { handleNextStep } = useJoin()
  useLoginToken()

  return (
    <Link
      href="/join"
      onClick={handleNextStep}
      className="flex w-full px-spacing-06 py-spacing-04 rounded-radius-04 border bg-transparent border-border-subtle-01"
    >
      <Icon icon="device_phone" className="fill-white" />
      <span className="w-full body-03-medium text-center text-text-on-color">
        전화번호로 시작하기
      </span>
    </Link>
  )
}
