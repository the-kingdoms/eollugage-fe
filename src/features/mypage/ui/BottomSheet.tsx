import { PositionGroupType } from '@/shared/types/myPageTypes'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '@/shared/ui/shadcn/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/shadcn/drawer'
import { TextField, Icon } from '@eolluga/eolluga-ui'
import { useState } from 'react'

export default function BottomSheet({
  positionList,
  onAddPosition,
  onDeletePosition,
  isOpen,
  closeBottomSheet,
}: {
  positionList: PositionGroupType[]
  onAddPosition: (newPosition: PositionGroupType) => void
  onDeletePosition: (id: string) => void
  isOpen: boolean
  closeBottomSheet: () => void
}) {
  const [positions, setPositions] = useState<PositionGroupType[]>(positionList)
  const [inputValue, setInputValue] = useState<string>('')

  const handlePositionsChange = (value: string, index: number) => {
    const updatedList = [...positionList]
    updatedList[index].position = value
    setPositions(updatedList)
  }

  const addNewPosition = (newPosition: string) => {
    if (newPosition.trim() !== '') {
      const newPositionItem: PositionGroupType = {
        id: uuidv4(),
        position: newPosition,
        items: [],
      }
      onAddPosition(newPositionItem)
    }
    closeBottomSheet()
  }

  const handleDelete = (id: string) => {
    onDeletePosition(id)
  }

  return (
    <Drawer open={isOpen} onOpenChange={closeBottomSheet}>
      <DrawerTrigger asChild>
        <Button variant="outline">직책 선택</Button>
      </DrawerTrigger>
      <DrawerContent className="h-5/6" aria-describedby="set-positions">
        <DrawerHeader className="relative">
          <DrawerTitle>가게 직책</DrawerTitle>
          <DrawerDescription />
          <button onClick={() => addNewPosition(inputValue)} className="absolute top-5 right-7">
            <span className="text-support-info body-03-medium">저장</span>
          </button>
        </DrawerHeader>
        <div className="flex flex-col space-y-4 justify-between">
          {positionList.map((position, idx) => (
            <div key={position.id} className="flex justify-between items-center px-5">
              <TextField
                value={positions[idx].position}
                onChange={e => handlePositionsChange(e.target.value, idx)}
                size="M"
                style="outlined"
                placeholder="직책 입력"
              />
              <button onClick={() => handleDelete(position.id)} className="p-3">
                <Icon icon="delete" />
              </button>
            </div>
          ))}
        </div>

        <div className="w-full border-t-2 fixed bottom-4 pt-3">
          <div className=" px-4">
            <TextField
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              size="M"
              style="outlined"
              placeholder="직책 추가하기"
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
