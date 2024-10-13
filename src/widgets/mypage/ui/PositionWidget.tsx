'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid'
import { TopBar, ButtonMobile } from '@eolluga/eolluga-ui'
import { PositionGroupType } from '@/shared/types/myPageTypes'
import PositionGroup from '@/features/mypage/ui/PositionGroup'
import BottomSheet from '@/features/mypage/ui/BottomSheet'

export default function PositionWidget() {
  const { push } = useRouter()
  const [positionList, setPositionList] = useState<PositionGroupType[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setPositionList([
      {
        id: uuidv4(),
        position: '미지정',
        items: [
          { id: uuidv4(), name: '이수아' },
          { id: uuidv4(), name: '오지윤' },
        ],
      },
      {
        id: uuidv4(),
        position: '알바생',
        items: [
          { id: uuidv4(), name: '윤수민' },
          { id: uuidv4(), name: '오지윤' },
          { id: uuidv4(), name: '최주원' },
        ],
      },
      {
        id: uuidv4(),
        position: '매니저',
        items: [{ id: uuidv4(), name: '얼루가' }],
      },
    ])
  }, [])

  const openBottomSheet = () => {
    setIsOpen(true)
  }
  const closeBottomSheet = () => {
    setIsOpen(false)
  }
  const addPosition = (newPosition: PositionGroupType) => {
    setPositionList(prevList => [...prevList, newPosition])
  }

  const deletePosition = (id: string) => {
    setPositionList(prevList => prevList.filter(position => position.id !== id))
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return
    const updatedList = Array.from(positionList)
    if (source.droppableId === destination.droppableId) {
      const sourceGroup = updatedList.find(group => group.id === source.droppableId)
      if (sourceGroup) {
        const [movedItem] = sourceGroup.items.splice(source.index, 1)
        movedItem.id = uuidv4()
        sourceGroup!.items.splice(destination.index, 0, movedItem)
        setPositionList(updatedList)
      }
    } else {
      const sourceGroup = updatedList.find(group => group.id === source.droppableId)
      const destinationGroup = updatedList.find(group => group.id === destination.droppableId)
      if (sourceGroup && destinationGroup) {
        const [movedItem] = sourceGroup!.items.splice(source.index, 1)
        movedItem.id = uuidv4()
        destinationGroup.items.splice(destination.index, 0, movedItem)
        setPositionList(updatedList)
      }
    }
  }

  const postPositions = () => {
    // 최종변경사항 저장하는 로직이 들어갈 예정
    push('/mypage')
  }

  return (
    <main className="flex-grow pt-4">
      <TopBar
        leftIcon="chevron_left_outlined"
        title="근무자 직책 설정"
        onClickLeftIcon={() => push('/mypage')}
        rightText="저장"
        onClickRightText={postPositions}
      />
      <div style={{ height: 'calc(100vh - 150px)' }} className="mt-4 overflow-y-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          {positionList.map((group, index) => (
            <PositionGroup
              key={group.id}
              id={group.id}
              position={group.position}
              items={group.items}
              index={index}
              length={positionList.length}
            />
          ))}
        </DragDropContext>
      </div>
      <footer className="w-full py-3 px-4 fixed bottom-4">
        <ButtonMobile
          style="primary"
          size="L"
          type="text"
          state="enabled"
          text1="가게 직책 보기"
          onClick={openBottomSheet}
        />
      </footer>
      {isOpen && (
        <BottomSheet
          positionList={positionList}
          onAddPosition={addPosition}
          isOpen={isOpen}
          onDeletePosition={deletePosition}
          closeBottomSheet={closeBottomSheet}
        />
      )}
    </main>
  )
}
