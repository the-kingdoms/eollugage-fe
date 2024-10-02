export interface PositionItem {
  id: string
  name: string
}

export interface PositionGroupType {
  id: string
  position: string
  items: PositionItem[]
}

//positionGroup 컴포넌트 props 타입
export interface PositionGroupProps {
  id: string
  position: string
  items: PositionItem[]
  index: number
  length: number
}
