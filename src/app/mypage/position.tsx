import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { TopBar, ButtonMobile } from '@eolluga/eolluga-ui'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import PositionGroup from './positionGroup'
import BottomSheet from './bottomSheet'

export interface PositionItem {
  id: string
  name: string
}

export interface PositionGroupType {
  id: string
  position: string
  items: PositionItem[]
}

// 근무자 직책 설정
export default function PositionPage({ setCurrentPage }: { setCurrentPage: () => void }) {
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
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) return

    const updatedList = Array.from(positionList)

    // 같은 포지션 내에서 항목을 이동하는 경우
    if (source.droppableId === destination.droppableId) {
      const sourceGroup = updatedList.find(group => group.id === source.droppableId)
      if (sourceGroup) {
        const [movedItem] = sourceGroup.items.splice(source.index, 1)
        sourceGroup!.items.splice(destination.index, 0, movedItem)
        setPositionList(updatedList)
      }
    }
    // 다른 포지션으로 항목을 이동하는 경우
    else {
      const sourceGroup = updatedList.find(group => group.id === source.droppableId)
      const destinationGroup = updatedList.find(group => group.id === destination.droppableId)

      if (sourceGroup && destinationGroup) {
        const [movedItem] = sourceGroup!.items.splice(source.index, 1)
        destinationGroup.items.splice(destination.index, 0, movedItem)
        setPositionList(updatedList)
      }
    }
  }

  return (
    <main className="flex-grow mt-4">
      <TopBar leftIcon="chevron_left_outlined" title="근무자 직책 설정" onClickLeftIcon={setCurrentPage} />
      <div className="mt-4 pb-32">
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
          setPositionList={setPositionList}
          closeBottomSheet={closeBottomSheet}
        />
      )}
    </main>
  )
}
