'use client'

import { useAtom, useAtomValue } from 'jotai'
import { isOwnerAtom, storeIdAtom } from '@/shared'
import WorkManagementWorker from './WorkManagementWorker'
import WorkManagementOwner from './WorkManagementOwner'

export default function WorkManagement() {
  const isOwner = useAtom(isOwnerAtom)
  const storeId = useAtomValue(storeIdAtom)

  return isOwner ? <WorkManagementOwner storeId={storeId} /> : <WorkManagementWorker />
}
