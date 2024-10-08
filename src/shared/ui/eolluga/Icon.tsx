import { iconKey, icons } from '@/shared/types/iconKeyType'
import { AriaAttributes } from 'react'

/**
 * 이 컴포넌트는 svg 형태로 아이콘을 보여주며, props를 사용하여 아이콘의 크기와 스타일을 정의 할 수 있습니다.
 * 색상은 classname 에서 fill-{color token} 으로 지정해주세요.
 * 대 주제 Social, Modifier 은 색상 변경이 불가능합니다.
 */
type IconProps = {
  /**
   * 아이콘 타입
   */
  icon: iconKey
  /**
   * 아이콘 크기
   */
  size?: number
  className?: string
}

const Icon = (props: IconProps & AriaAttributes) => {
  const { icon, size = 24, className } = props
  const SVGIcon = icons[icon]

  return (
    <SVGIcon
      {...props}
      className={`${className} ${className?.includes('fill-') ? '' : 'fill-icon-primary'}`}
      width={size ?? 24}
      height={size ?? 24}
      fill="currentColor"
    />
  )
}

export default Icon
