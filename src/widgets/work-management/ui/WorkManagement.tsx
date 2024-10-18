'use client'

import { useAtom, useAtomValue } from 'jotai'
import { isOwnerAtom, storeIdAtom } from '@/shared'
import WorkManagementOwner from './WorkManagementOwner'
import WorkManagementMember from './WorkManagementMember'

export default function WorkManagement() {
  const isOwner = useAtom(isOwnerAtom)
  const storeId = useAtomValue(storeIdAtom)

  return isOwner ? <WorkManagementOwner storeId={storeId} /> : <WorkManagementMember />
}
