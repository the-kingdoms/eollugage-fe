export interface RelationT {
  id: string
  storeId: string
  role: 'OWNER' | 'STAFF'
  position: string
}
export interface UserInfo {
  id: string
  name: string
  phone: string
  providerType: string
  relationDTO: RelationT
}
