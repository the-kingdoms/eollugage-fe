import axios from 'axios'

async function getImageFromS3(fileFullName: string) {
  try {
    const presignedURL = await getPresignedUrl(fileFullName)
    const response = await axios.get(presignedURL, { responseType: 'blob' })
    const blob = new Blob([response.data], { type: response.headers['content-type'] })
    const imageURL = window.URL.createObjectURL(blob)

    return imageURL
  } catch (error) {
    console.log('get image from S3 error', error)
    return ''
  }
}

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

export { getImageFromS3 }
