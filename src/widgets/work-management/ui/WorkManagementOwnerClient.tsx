'use client'

import React from 'react'

import { useSetAtom } from 'jotai'
import { useMembers } from '@/entities'
import { selectedMemberAtom } from '../atoms/workManagementAtoms'
import AttendanceInfo from './AttendanceInfo'
import AddAttendanceLink from './AddAttendanceLink'
import MemberSelector from './MemberSelector'

export default function WorkManagementOwnerClient({ storeId }: { storeId: string }) {
  const { members } = useMembers(storeId)
  const setSelectedMemberID = useSetAtom(selectedMemberAtom)

  setSelectedMemberID(members ? members[0]?.id : null)
  return (
    <>
      <MemberSelector />
      <AttendanceInfo />
      <div className="bottom-[84px] right-4 absolute">
        <AddAttendanceLink storeId={storeId} />
      </div>
    </>
  )
}
