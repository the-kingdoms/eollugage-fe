import { atom } from 'jotai'

export const isOwnerAtom = atom<boolean>(true)
export const storeIdAtom = atom<string>('')
export const loginMethodAtom = atom<'apple' | 'kakao' | 'phone'>('apple')
