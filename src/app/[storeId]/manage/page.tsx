import { WorkManagement } from '@/widgets'

export default function ManagePage({ params }: { params: { storeId: string } }) {
  console.log('params', params)
  return <WorkManagement storeId={params.storeId} />
}
