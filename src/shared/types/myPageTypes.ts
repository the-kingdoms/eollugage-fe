export interface PositionItem {
  id: string
  name: string
  position: string
  phoneNumber: string
}

export interface PositionGroupType {
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
