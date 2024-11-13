import { PositionGroupType } from '@/shared/types/myPageTypes'
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
import { useState, useEffect } from 'react'

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
  const [positionStates, setPositionStates] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>('')

  useEffect(() => {
    const initialStates = positionList.map(e => e.position)
    setPositionStates(initialStates)
  }, [])

  const handlePositionChange = (value: string) => {
    setPositionStates(prevStates => ({
      ...prevStates,
      value,
    }))
  }

  const updatePosition = () => {
    if (inputValue.trim() !== '') {
      const newPositionItem: PositionGroupType = {
        position: inputValue,
        items: [],
      }
      onAddPosition(newPositionItem)
      setInputValue('')
    }
    positionList.map((position, idx) => ({
      ...position,
      position: positionStates[idx] || position.position,
    }))
    closeBottomSheet()
  }

  const handleDelete = (id: string) => {
    setPositionStates(prevStates => prevStates.filter(position => position !== id))
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
          <button type="button" onClick={updatePosition} className="absolute top-5 right-7">
            <span className="text-support-info body-03-medium">저장</span>
          </button>
        </DrawerHeader>
        <div className="flex flex-col space-y-4 justify-between">
          {positionStates.map(position => (
            <div key={position} className="flex justify-between items-center px-5">
              <TextField
                value={position}
                onChange={e => handlePositionChange(e.target.value)}
                size="M"
                style="outlined"
                placeholder="직책 입력"
              />
              <button type="button" onClick={() => handleDelete(position)} className="p-3">
                <Icon icon="delete" />
              </button>
            </div>
          ))}
        </div>

        <div className="w-full border-t-2 fixed bottom-4 pt-3">
          <div className="px-4">
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
