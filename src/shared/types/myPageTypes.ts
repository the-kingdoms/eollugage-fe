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

export interface Relation {
  id: string
  storeId: string
  role: 'OWNER' | 'MANAGER' | 'EMPLOYEE'
  position: string
  member: string
}

export interface Store {
  storeId: string
  name: string
  introduction: string
  image: string
  phone: string
  address: string
  openingHour: string
  originalInfo: string
  externalNotice: string
  internalNotice: string
}

export interface UserData {
  id: string
  name: string
  phone: string
  providerType: 'GOOGLE' | 'FACEBOOK' | 'EMAIL'
  relationList: Relation[]
  storeList: Store[]
}
