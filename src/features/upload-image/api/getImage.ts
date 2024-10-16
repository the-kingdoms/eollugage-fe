import axios from 'axios'
async function getPresignedUrl(fileFullName: string) {
  try {
    const res = await axios.post(process.env.NEXT_PUBLIC_PRESIGNED_URL_SERVER, {
      name: fileFullName,
      method: 'get',
    })
    return res.data.presigned_url
  } catch (error) {
    console.log('get presigned url error:', error)
  }
}
