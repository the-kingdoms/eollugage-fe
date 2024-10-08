import { atom } from 'jotai'

export const loginMethodAtom = atom<'apple' | 'kakao' | 'phone'>('apple')
export const stepAtom = atom<number>(1)
