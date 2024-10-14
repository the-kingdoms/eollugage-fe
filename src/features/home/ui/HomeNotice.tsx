'use client'

import { useRouter } from 'next/navigation'
import { Icon, TextField } from '@eolluga/eolluga-ui'
import Link from 'next/link'
import HomeBundle from './HomeBundle'

export default function HomeNotice() {
  const router = useRouter()

  return (
    <HomeBundle
      title="가게 공지"
      rightChild={
        <button
          onClick={() => {
            router.push('/home/notice')
          }}
        >
          <Icon icon="chevron_right_outlined" size={20} />
        </button>
      }
      lowChild={
        <Link href="/home/notice" className="w-full" passHref>
          <TextField
            size="L"
            placeholder="공지가 아직 없어요"
            value=""
            onChange={() => {}}
            style="outlined"
          />
        </Link>
      }
    />
  )
}
