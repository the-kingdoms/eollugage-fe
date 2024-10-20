'use client'

import { useAtom } from 'jotai'
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
  const storeId = '123'
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

    yearWeekly,
    setYearWeekly,
    monthWeekly,
    setMonthWeekly,
    weekOfMonthWeekly,
    setWeekOfMonthWeekly,

    yearMonthly,
    setYearMonthly,
    monthMonthly,
    setMonthMonthly,
  }
}

export default useAttendance
