import { iconKey } from '@/shared/types/iconKeyType'
import { BadgeStateType } from '../../types/badgeType'
import Icon from './Icon'

export interface BadgeIconProps {
  icon: iconKey
  size?: number
  state: BadgeStateType
}

const iconStyle = {
  success: 'fill-support-success',
  warning: 'fill-support-warning',
  error: 'fill-support-error',
  processing: 'fill-support-info',
}

export default function BadgeIcon({ icon, size = 24, state }: BadgeIconProps) {
  return <Icon icon={icon} size={size} className={`${iconStyle[state]}`} />
}