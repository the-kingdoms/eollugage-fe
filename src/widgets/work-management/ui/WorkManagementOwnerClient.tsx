'use client'

import React, { useEffect } from 'react'

import { useAtom } from 'jotai'
import { useMembers } from '@/entities'
import { selectedMemberAtom } from '../atoms/workManagementAtoms'
import AttendanceInfo from './AttendanceInfo'
import AddAttendanceLink from './AddAttendanceLink'
import MemberSelector from './MemberSelector'

export default function WorkManagementOwnerClient({ storeId }: { storeId: string }) {
  const { members } = useMembers(storeId)
  const [selectesMemberId, setSelectedMemberID] = useAtom(selectedMemberAtom)
  useEffect(() => {
    if (selectesMemberId === null) {
      setSelectedMemberID(members ? members[0]?.memberId : null)
    }
  }, [selectesMemberId])

  return (
    <>
      <MemberSelector storeId={storeId} />
      <AttendanceInfo storeId={storeId} />
      <div className="bottom-[84px] right-4 absolute">
        <AddAttendanceLink storeId={storeId} />
      </div>
    </>
  )
}
