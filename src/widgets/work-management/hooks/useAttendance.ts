'use client'

import { useAtom } from 'jotai'
import {
  monthAtom,
  monthMONTHLYAtom,
  selectedMemberAtom,
  selectedTypeAtom,
  storeIdAtom,
  weekAtom,
  yearAtom,
  yearMONTHLYAtom,
} from '../atoms/workManagementAtoms'

const useAttendance = () => {
  const [storeId, setStoreId] = useAtom(storeIdAtom)
  const [memberId, setMemberId] = useAtom(selectedMemberAtom)
  const [type, setType] = useAtom(selectedTypeAtom)
  const [yearWEEKLY, setYearWEEKLY] = useAtom(yearAtom)
  const [monthWEEKLY, setMonthWEEKLY] = useAtom(monthAtom)
  const [weekOfMonthWEEKLY, setWeekOfMonthWEEKLY] = useAtom(weekAtom)
  const [yearMONTHLY, setYearMONTHLY] = useAtom(yearMONTHLYAtom)
  const [monthMONTHLY, setMonthMONTHLY] = useAtom(monthMONTHLYAtom)

  return {
    storeId,
    setStoreId,
    memberId,
    setMemberId,
    type,
    setType,

    yearWEEKLY,
    setYearWEEKLY,
    monthWEEKLY,
    setMonthWEEKLY,
    weekOfMonthWEEKLY,
    setWeekOfMonthWEEKLY,

    yearMONTHLY,
    setYearMONTHLY,
    monthMONTHLY,
    setMonthMONTHLY,
  }
}

export default useAttendance
