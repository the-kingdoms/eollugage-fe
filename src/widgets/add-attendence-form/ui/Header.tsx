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
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.9206 2.76705C14.1179 2.97634 14.1082 3.30597 13.8989 3.5033L7.00918 9.99935L13.8989 16.4954C14.1082 16.6927 14.1179 17.0224 13.9206 17.2316C13.7232 17.4409 13.3936 17.4506 13.1843 17.2533L5.89266 10.3783C5.78829 10.2799 5.72913 10.1428 5.72913 9.99935C5.72913 9.8559 5.78829 9.7188 5.89266 9.6204L13.1843 2.7454C13.3936 2.54807 13.7232 2.55776 13.9206 2.76705Z"
            fill="#262626"
          />
        </svg>
      </Link>

      <h2>근무 추가</h2>
    </header>
  )
}
