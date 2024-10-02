// eslint-disable-next-line object-curly-newline
import { atom, createStore, Provider, useAtom } from 'jotai'

const store = createStore()
const selectedWorkerIDAtom = atom('1')
export default function WorkManagementOwnerProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
export const useSelectedWorkerID = () => useAtom(selectedWorkerIDAtom)
