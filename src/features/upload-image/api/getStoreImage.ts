import axios from 'axios'
import { getPresignedUrl } from './getPresignedURL'

async function getImageFromS3(fileFullName: string) {
  try {
    const presignedURL = await getPresignedUrl(fileFullName)
    if (presignedURL.length === 0) throw new Error()
    const response = await axios.get(presignedURL, { responseType: 'blob' })
    const blob = new Blob([response.data], { type: response.headers['content-type'] })
    const imageURL = window.URL.createObjectURL(blob)

    return imageURL
  } catch (error) {
    return ''
  }
}

export { getImageFromS3 }
