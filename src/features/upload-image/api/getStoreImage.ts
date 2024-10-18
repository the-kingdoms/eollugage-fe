import axios from 'axios'
import { getPresignedUrl } from './getPresignedURL'

async function getImageFromS3(fileFullName: string) {
  try {
    const presignedURL = await getPresignedUrl(fileFullName)
    const response = await axios.get(presignedURL, { responseType: 'blob' })
    const blob = new Blob([response.data], { type: response.headers['content-type'] })
    const imageURL = window.URL.createObjectURL(blob)

    console.log(blob, imageURL)
    return imageURL
  } catch (error) {
    console.log('get image from S3 error', error)
    return ''
  }
}

export { getImageFromS3 }
