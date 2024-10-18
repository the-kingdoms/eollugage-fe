'use client'

import { useAtom } from 'jotai'
import { storeIdAtom } from '@/shared'
import {
  monthAtom,
  monthMonthlyAtom,
  selectedMemberAtom,
  selectedTypeAtom,
  weekAtom,
  yearAtom,
  yearMonthlyAtom,
} from '../atoms/workManagementAtoms'

const useAttendance = () => {
  const [storeId] = useAtom(storeIdAtom)
  const [memberId, setMemberId] = useAtom(selectedMemberAtom)
  const [type, setType] = useAtom(selectedTypeAtom)
  const [yearWeekly, setYearWeekly] = useAtom(yearAtom)
  const [monthWeekly, setMonthWeekly] = useAtom(monthAtom)
  const [weekOfMonthWeekly, setWeekOfMonthWeekly] = useAtom(weekAtom)
  const [yearMonthly, setYearMonthly] = useAtom(yearMonthlyAtom)
  const [monthMonthly, setMonthMonthly] = useAtom(monthMonthlyAtom)

  return {
    storeId,
    memberId,
    setMemberId,
    type,
    setType,

    // Weekly values
    yearWeekly,
    setYearWeekly,
    monthWeekly,
    setMonthWeekly,
    weekOfMonthWeekly,
    setWeekOfMonthWeekly,

    // Monthly values
    yearMonthly,
    setYearMonthly,
    monthMonthly,
    setMonthMonthly,
  }
}

export default useAttendance
