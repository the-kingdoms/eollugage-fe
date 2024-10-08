import * as Commerce from '@public/image/eolluga/commerce'
import * as Control from '@public/image/eolluga/control'
import * as Data from '@public/image/eolluga/data'
import * as File from '@public/image/eolluga/file'
import * as Formatting from '@public/image/eolluga/formatting'
import * as Modifier from '@public/image/eolluga/modifier'
import * as Navigation from '@public/image/eolluga/navigation'
import * as Social from '@public/image/eolluga/social'
import * as Status from '@public/image/eolluga/status'
import * as Operation from '@public/image/eolluga/operation'
import * as Technology from '@public/image/eolluga/technology'
import * as Time from '@public/image/eolluga/time'
import * as Toggle from '@public/image/eolluga/toggle'
import * as User from '@public/image/eolluga/user'
import { AriaAttributes } from 'react'

export const IconCategory = {
  Commerce: { ...Commerce },
  Control: { ...Control },
  Data: { ...Data },
  File: { ...File },
  Formatting: { ...Formatting },
  Modifier: { ...Modifier },
  Navigation: { ...Navigation },
  Social: { ...Social },
  Status: { ...Status },
  Operation: { ...Operation },
  Technology: { ...Technology },
  Time: { ...Time },
  Toggle: { ...Toggle },
  User: { ...User },
}

export const icons = {
  ...Commerce,
  ...Control,
  ...Data,
  ...File,
  ...Formatting,
  ...Modifier,
  ...Navigation,
  ...Social,
  ...Status,
  ...Operation,
  ...Technology,
  ...Time,
  ...Toggle,
  ...User,
}
// 아이콘 목록을 배열로 정의
export const iconKeys: iconKey[] = Object.keys(icons) as iconKey[]

export type iconKey = keyof typeof icons
