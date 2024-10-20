import { DefaultResponseT, axiosInstance } from '@/shared'

interface OrderT {
  title: string
  content: string
}

async function postOrder(body: OrderT, storeId: string): Promise<DefaultResponseT> {
  const { data } = await axiosInstance.post(`/v1/stores/${storeId}/orders`, body)
  return data
}

export { postOrder }
