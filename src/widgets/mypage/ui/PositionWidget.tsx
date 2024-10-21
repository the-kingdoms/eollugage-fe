'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { TopBar, ButtonMobile } from '@eolluga/eolluga-ui'
import { PositionItem, PositionGroupType } from '@/shared/types/myPageTypes'
import PositionGroup from '@/features/mypage/ui/PositionGroup'
import BottomSheet from '@/features/mypage/ui/BottomSheet'
import { useGetPosition } from '@/features/mypage/model/useGetPositions'
import { usePostPosition } from '@/features/mypage/model/usePostPosition'

export default function PositionWidget({ storeId }: { storeId: string }) {
  const { push } = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { data, error } = useGetPosition(storeId)
  const postPosition = usePostPosition()

  if (error) console.log(error)

  function groupByPosition(initialPositions: PositionItem[]) {
    const groupedPositions: PositionGroupType[] = initialPositions.reduce<PositionGroupType[]>(
      (acc, item) => {
        const group = acc.find(g => g.position === item.position)
        if (group) {
          group.items.push(item)
        } else {
          acc.push({ position: item.position, items: [item] })
        }
        return acc
      },
      [],
    )
    return groupedPositions
  }

  const [positionList, setPositionList] = useState<PositionGroupType[]>(
    data ? groupByPosition(data) : [],
  )
  if (data && positionList.length === 0) {
    setPositionList(groupByPosition(data))
  }

  const openBottomSheet = () => {
    setIsOpen(true)
  }
  const closeBottomSheet = () => {
    setIsOpen(false)
  }

  const addPosition = (newPosition: PositionGroupType) => {
    setPositionList(prevList => [...prevList, newPosition])
  }

  const deletePosition = (position: string) => {
    setPositionList(prevList => prevList.filter(employee => employee.position !== position))
  }

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result
      if (!destination) return
      const updatedList = Array.from(positionList)

      const sourceGroup = updatedList.find(group => group.position === source.droppableId)
      const destinationGroup = updatedList.find(group => group.position === destination.droppableId)

      if (sourceGroup && destinationGroup) {
        const [movedItem] = sourceGroup.items.splice(source.index, 1)
        destinationGroup.items.splice(destination.index, 0, movedItem)
        if (source.droppableId !== destination.droppableId) {
          postPosition({ storeId, memberId: movedItem.memberId })
        }
        setPositionList(updatedList)
      }
    },
    [positionList, postPosition, storeId],
  )

  const postPositions = () => {
    // 추후에 전체 근무자 리스트를 수정할 수 있는 엔드포인트가 개발되면 추가 예정
    console.log('저장')
  }

  return (
    <main className="flex-grow pt-4">
      <TopBar
        leftIcon="chevron_left_outlined"
        title="근무자 직책 설정"
        onClickLeftIcon={() => push(`/${storeId}/mypage`)}
        rightText="저장"
        onClickRightText={postPositions}
      />
      <div style={{ height: 'calc(100vh - 150px)' }} className="mt-4 overflow-y-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          {positionList.map((group, index) => (
            <PositionGroup
              key={index}
              id={group.position}
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
