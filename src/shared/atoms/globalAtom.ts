import { atom } from 'jotai'

// 사장이면 true, 직원이면 false
export const isOwnerAtom = atom<boolean>(true)
export const loginMethodAtom = atom<'apple' | 'kakao' | 'phone'>('apple')
