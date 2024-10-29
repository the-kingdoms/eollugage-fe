'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { TopBar, ButtonMobile } from '@eolluga/eolluga-ui'
import { PositionItem, PositionGroupType } from '@/shared/types/myPageTypes'
import PositionGroup from '@/features/mypage/ui/PositionGroup'
import BottomSheet from '@/features/mypage/ui/BottomSheet'
import { usePutPosition } from '@/features/mypage/model/usePutPosition'
import { usePostPosition } from '@/features/mypage/model/usePostPosition'

export default function PositionWidget({
  storeId,
  initialData,
}: {
  storeId: string
  initialData: PositionItem[]
}) {
  const { push } = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isModified, setIsModified] = useState(false)
  const putPosition = usePutPosition()
  const postPosition = usePostPosition()

  function groupByPosition(initialPositions: PositionItem[]) {
    const groupedPositions: PositionGroupType[] = initialPositions.reduce<PositionGroupType[]>(
      (acc, item) => {
        const group = acc.find(g => g.position === item.position && g.position !== '사장님')
        if (group) {
          group.items.push(item)
        } else if (item.position !== '사장님' || acc.some(g => g.position === '사장님')) {
          acc.push({ position: item.position, items: [item] })
        }
        return acc
      },
      [],
    )
    return groupedPositions
  }

  const [positionList, setPositionList] = useState<PositionGroupType[]>([])

  useEffect(() => {
    const data = groupByPosition(initialData)
    setPositionList(data)
  }, [])

  const openBottomSheet = () => {
    setIsOpen(true)
  }
  const closeBottomSheet = () => {
    setIsOpen(false)
  }

  const addPosition = (newPosition: PositionGroupType) => {
    setPositionList(prevList => [...prevList, newPosition])
    setIsModified(true)
  }

  const deletePosition = (position: string) => {
    setPositionList(prevList =>
      prevList
        .map(group =>
          group.position === position
            ? {
                ...group,
                position: '미지정',
                items: group.items.map(item => ({ ...item, position: '미지정' })),
              }
            : group,
        )
        .filter(group => group.position !== position || group.position === '미지정'),
    )
    setIsModified(true)
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
          movedItem.position = destination.droppableId
        }
        setPositionList(updatedList)
        setIsModified(true)
      }
    },
    [positionList, putPosition, storeId],
  )

  /* 저장을 눌렀을때 최종적으로 반영 */
  const updatePositions = async () => {
    if (isModified) {
      const updatePromises = positionList.map((position, idx) =>
        postPosition.mutate({
          storeId,
          memberId: position.items[idx].memberId,
          position: position.items[idx].position,
        }),
      )
      await Promise.all(updatePromises)
    }
  }

  return (
    <main className="flex-grow pt-4">
      <TopBar
        leftIcon="chevron_left_outlined"
        title="근무자 직책 설정"
        onClickLeftIcon={() => push(`/${storeId}/mypage`)}
        rightText={isModified ? '저장' : ''}
        onClickRightText={updatePositions}
      />
      <div style={{ height: 'calc(100vh - 150px)' }} className="mt-4 overflow-y-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          {positionList.map((group, index) => (
            <PositionGroup
              key={group.position}
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
