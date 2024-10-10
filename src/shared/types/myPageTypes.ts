export interface PositionItem {
  id: string
  name: string
}

export interface PositionGroupType {
  id: string
  position: string
  items: PositionItem[]
}

export interface PositionGroupProps {
  id: string
  position: string
  items: PositionItem[]
  index: number
  length: number
}
