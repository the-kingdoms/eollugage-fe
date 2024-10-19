'use client'

import { useAtom } from 'jotai'
import { isOwnerAtom } from '@/shared'
import WorkManagementOwner from './WorkManagementOwner'
import WorkManagementMember from './WorkManagementMember'

export default function WorkManagement({ storeId }: { storeId: string }) {
  const isOwner = useAtom(isOwnerAtom)

  return isOwner ? (
    <WorkManagementOwner storeId={storeId} />
  ) : (
    <WorkManagementMember storeId={storeId} />
  )
}
