/* eslint-disable import/no-extraneous-dependencies */
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Icon } from '@eolluga/eolluga-ui'
import { PositionGroupProps } from '@/types/myPageTypes'

export default function PositionGroup({ id, position, items, index, length }: PositionGroupProps) {
  return (
    <>
      <Droppable droppableId={id}>
        {provided => (
          <ul className="flex flex-col gap-spacing-02 p-4" {...provided.droppableProps} ref={provided.innerRef}>
            <li className="body-03-bold text-text-primary justify-content">{position}</li>
            {items.map((item, idx) => (
              <Draggable key={item.id} draggableId={item.id} index={idx}>
                {provided => (
                  <li
                    className="flex justify-between py-spacing-04"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <span>{item.name}</span>
                    <div {...provided.dragHandleProps}>
                      <Icon icon="draggable" />
                    </div>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      {index !== length - 1 && <div className="h-[12px] bg-Gray-10" />}
    </>
  )
}
