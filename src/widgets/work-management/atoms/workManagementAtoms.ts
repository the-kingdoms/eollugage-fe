'use client'

import { getWeekOfMonth } from '@/shared'
import { atom } from 'jotai'

const { year, month, weekOfMonth } = getWeekOfMonth(new Date())
export const selectedMemberAtom = atom<string | null>(null)
export const selectedTypeAtom = atom<'weekly' | 'monthly'>('weekly')
export const yearAtom = atom<number>(year)
export const monthAtom = atom<number>(month)
export const weekAtom = atom<number>(weekOfMonth)
export const yearMonthlyAtom = atom(new Date().getFullYear())
export const monthMonthlyAtom = atom(new Date().getMonth() + 1)
