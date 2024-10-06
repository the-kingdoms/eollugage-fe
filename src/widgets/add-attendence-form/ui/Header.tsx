import { Icon } from '@eolluga/eolluga-ui'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="h-[32px] text-center relative flex items-center justify-center py-[6px] font-medium mt-[12px] mb-[32px]">
      <Link
        className="absolute left-[14px] top-1/2 -translate-y-1/2"
        type="button"
        aria-label="뒤로가기"
        href="/manage"
      >
        <Icon icon="chevron_left_outlined" />
      </Link>

      <h2>근무 추가</h2>
    </header>
  )
}
