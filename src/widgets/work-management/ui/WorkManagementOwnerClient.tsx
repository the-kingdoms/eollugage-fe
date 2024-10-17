'use client'

import React from 'react'

import { useSetAtom } from 'jotai'
import { selectedEmployeeAtom } from '../atoms/workManagementAtoms'
import AttendanceInfo from './AttendanceInfo'
import AddAttendanceLink from './AddAttendanceLink'
import EmployeeSelector from './EmployeeSelector'

export default function WorkManagementOwnerClient() {
  const setSelectedEmployeeID = useSetAtom(selectedEmployeeAtom)
  setSelectedEmployeeID('1')
  return (
    <>
      <EmployeeSelector />
      <AttendanceInfo />
      <div className="bottom-[84px] right-4 absolute">
        <AddAttendanceLink />
      </div>
    </>
  )
}
