import { useState } from 'react'
import { motion } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid'
import { TextField, Icon } from '@eolluga/eolluga-ui'
import { PositionGroupType } from '@/types/myPageTypes'

export default function BottomSheet({
  positionList,
  setPositionList,
  closeBottomSheet
}: {
  positionList: PositionGroupType[]
  setPositionList: (value: PositionGroupType[]) => void
  closeBottomSheet: () => void
}) {
  const [positions, setPositions] = useState<string[]>(
    positionList.map((item) => item.position)
  )
  const [inputValue, setInputValue] = useState<string>('')

  const handlePositionsChange = (value: string, index: number) => {
    const updatedList = [...positionList]
    updatedList[index].position = value
    const updatedPositions = [...positions]
    updatedPositions[index] = value
    setPositions(updatedPositions)
    setPositionList(updatedList)
  }

  const deletePosition = (id: string) => {
    const updatedPositionList = positionList.filter((e) => e.id !== id)
    setPositionList(updatedPositionList)
  }

  const addNewPosition = (value: string) => {
    if (value.trim() !== '') {
      const newPosition = {
        id: uuidv4(),
        position: value,
        items: []
      }
      const updatedPositionList = [...positionList]
      updatedPositionList.push(newPosition)
      setPositionList(updatedPositionList)
    }
    closeBottomSheet()
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-end">
      <motion.div
        initial={{ y: '20%' }}
        animate={{ y: 0 }}
        exit={{ y: '20%' }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={(event, info) => {
          if (info.point.y > 200) {
            closeBottomSheet()
          }
        }}
        className="bg-white w-full rounded-t-lg p-6 h-[90vh]"
      >
        <div className="flex justify-center mb-4">
          <div className="w-[40px] h-[4px] bg-gray-300 rounded-full" />
        </div>

        <div className="mb-8 relative">
          <h2 className="text-center label-03-medium">가게 직책</h2>
          <button
            onClick={() => addNewPosition(inputValue)}
            className="text-Blue-70 absolute top-0 right-0 font-bold"
          >
            저장
          </button>
        </div>

        <div className="flex flex-col justify-between space-y-4 h-[80%]">
          <div className="flex-grow">
            {positionList.map((position, idx) => (
              <div key={position.id} className="flex justify-between items-center pt-2">
                <TextField
                  value={position.position}
                  size="M"
                  style="outlined"
                  onChange={(e) => handlePositionsChange(e.target.value, idx)}
                />
                <button className="p-4" onClick={() => deletePosition(position.id)}>
                  <Icon icon="delete" />
                </button>
              </div>
            ))}
          </div>

          <div className="w-full border-t-[1px] px-3 py-4 fixed left-0 bottom-4">
            <TextField
              value={inputValue}
              size="M"
              style="outlined"
              placeholder="직책 추가하기"
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
