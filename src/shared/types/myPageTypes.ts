export interface PositionItem {
  memberId: string
  name: string
  phoneNumber: string
  position: string
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
