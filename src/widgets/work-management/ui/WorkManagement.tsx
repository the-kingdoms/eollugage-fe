'use client'

import { useAtom } from 'jotai'
import { isOwnerAtom } from '@/shared'
import WorkManagementOwner from './WorkManagementOwner'
import WorkManagementMember from './WorkManagementMember'

export default function WorkManagement() {
  const isOwner = useAtom(isOwnerAtom)
  const storeId = '123'

  return isOwner ? <WorkManagementOwner storeId={storeId} /> : <WorkManagementMember />
}
