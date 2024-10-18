import { atom } from 'jotai'

export const isOwnerAtom = atom<boolean>(true)
export const storeIdAtom = atom<string>('')
export const storeNameAtom = atom<string>('')
export const isValidCodeAtom = atom<boolean>(false)
