export interface RelationT {
  id: string
  storeId: string
  role: 'OWNER' | 'STAFF'
  position: string
}

interface Store {
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

export interface UserInfo {
  id: string
  name: string
  phone: string
  providerType: string
  relationDTO: RelationT
}
