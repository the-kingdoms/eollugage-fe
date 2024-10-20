'use client'

import { Icon, TextField } from '@eolluga/eolluga-ui'
import Link from 'next/link'
import HomeBundle from './HomeBundle'

interface HomeNoticeProps {
  storeId: string
  notice: string
}

export default function HomeNotice({ storeId, notice }: HomeNoticeProps) {
  return (
    <HomeBundle
      title="가게 공지"
      rightChild={
        <Link href={`/${storeId}/home/notice`} passHref>
          <Icon icon="chevron_right_outlined" size={20} />
        </Link>
      }
      lowChild={
        <Link href={`/${storeId}/home/notice`} className="w-full" passHref>
          <TextField
            size="L"
            placeholder="공지가 아직 없어요"
            value={notice}
            onChange={() => {}}
            style="outlined"
          />
        </Link>
      }
    />
  )
}

// use client 고민하기
