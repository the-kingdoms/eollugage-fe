import axios from 'axios'

export async function getPresignedUrl(fileFullName: string): Promise<string> {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_PRESIGNED_URL_SERVER}?name=${fileFullName}&method=get`,
    )
    return res.data.presigned_url
  } catch (error) {
    return ''
  }
}
