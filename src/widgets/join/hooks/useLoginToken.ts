import { useUser } from '@/entities'
import { sendRNFunction, setTokenFromCookie } from '@/shared'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface TokenResultT {
  isSuccess: boolean
  token?: string
}

export function useLoginToken() {
  const router = useRouter()
  const [enabled, setEnabled] = useState<boolean>(false)
  const { userInfo } = useUser(enabled)

  const onMessageEvent = (e: MessageEvent) => {
    e.stopPropagation()
    const message: { type: string; data: TokenResultT } = JSON.parse(String(e.data))

    if (message.type === 'getLoginToken') {
      const { data } = message
      if (data.isSuccess && data.token) {
        setTokenFromCookie(data.token, 7)
        setEnabled(true)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('message', onMessageEvent)
    document.addEventListener('message', onMessageEvent as EventListener)

    return () => {
      window.removeEventListener('message', onMessageEvent)
      document.removeEventListener('message', onMessageEvent as EventListener)
    }
  }, [])

  useEffect(() => {
    sendRNFunction('getLoginToken')
  }, [])

  useEffect(() => {
    if (userInfo) router.replace(`/${userInfo.relationList[0].storeId}/home`)
  }, [userInfo])
}
