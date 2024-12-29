export interface RelationT {
  id: string
  storeId: string
  role: 'OWNER' | 'STAFF'
  position: string
  member: string | null
}
export interface UserInfo {
  id: string
  name: string
  phone: string
  providerType: string
  relationList: RelationT[]
  storeList: Store[]
}
