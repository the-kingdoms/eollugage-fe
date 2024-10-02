import { useState } from 'react'

const useSelectWorker = (firstWorkerID: string) => {
  const [selectedWorkerID, setSelectedWorkerID] = useState<string | null>(firstWorkerID)
  return { selectedWorkerID, setSelectedWorkerID }
}
export default useSelectWorker
