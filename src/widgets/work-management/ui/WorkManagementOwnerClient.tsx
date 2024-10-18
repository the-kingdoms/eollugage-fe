'use client'

import React from 'react'

import { useSetAtom } from 'jotai'
import { selectedMemberAtom } from '../atoms/workManagementAtoms'
import AttendanceInfo from './AttendanceInfo'
import AddAttendanceLink from './AddAttendanceLink'
import MemberSelector from './MemberSelector'

export default function WorkManagementOwnerClient() {
  const setSelectedMemberID = useSetAtom(selectedMemberAtom)
  setSelectedMemberID('1')
  return (
    <>
      <MemberSelector />
      <AttendanceInfo />
      <div className="bottom-[84px] right-4 absolute">
        <AddAttendanceLink />
      </div>
    </>
  )
}
