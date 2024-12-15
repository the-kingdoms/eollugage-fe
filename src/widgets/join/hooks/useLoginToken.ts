'use client'

import { useUser } from '@/entities'
import { sendRNFunction, setTokenFromCookie } from '@/shared'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useLoginToken() {
  const router = useRouter()
  const pathname = usePathname()
  const [enabled, setEnabled] = useState<boolean>(false)
  const { userInfo } = useUser(enabled)

  const onSuccessGetToken = (token: string | undefined) => {
    if (token) {
      setTokenFromCookie(token, 7)
      setEnabled(true)
    }
  }

  useEffect(() => {
    sendRNFunction('getLoginToken')
  }, [])

  useEffect(() => {
    if (userInfo && pathname === '/') router.replace(`/${userInfo.relationDTO.storeId}/home`)
  }, [userInfo, pathname])

  return { onSuccessGetToken }
}
