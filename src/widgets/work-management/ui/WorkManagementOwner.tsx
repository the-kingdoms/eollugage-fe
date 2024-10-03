'use client'

import React from 'react'

import { AttendanceInfo } from '@/features'
import { useSetAtom } from 'jotai'
import WorkerSelector from './WorkerSelector'
import { selectedWorkerAtom } from '../atoms/workManagementAtoms'

export default function WorkManagementOwner() {
  const setSelectedWorkerID = useSetAtom(selectedWorkerAtom)
  setSelectedWorkerID('1')
  return (
    <>
      <WorkerSelector />
      <AttendanceInfo />
    </>
  )
}
