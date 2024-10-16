import React, { SetStateAction } from 'react'
import { ImageUploadResultT } from '../types/imageUploadType'
import { getImageFromS3 } from '../api/getImage'

interface HandleImageUploadParams {
  data: ImageUploadResultT
  setErrorMessage: React.Dispatch<SetStateAction<string>>
  setIsSuccess: React.Dispatch<SetStateAction<boolean>>
  setShowToast: React.Dispatch<SetStateAction<boolean>>
  setImageURL: React.Dispatch<SetStateAction<string>>
  setIsLoading: React.Dispatch<SetStateAction<boolean>>
}

function handleImageUpload({
  data,
  setErrorMessage,
  setIsSuccess,
  setShowToast,
  setImageURL,
  setIsLoading,
}: HandleImageUploadParams) {
  if (!data.isSuccess) {
    const failReason = data.reason
    switch (failReason) {
      case 'upload-fail':
        setErrorMessage('업로드에 실패했습니다.')
        break
      case 'not-select':
        setErrorMessage('사진이 선택되지 않았습니다.')
        break
      case 'presigned-url-error':
        setErrorMessage('다시 시도해주세요.')
        break
      default:
        setErrorMessage('다시 시도해주세요.')
    }
    setIsLoading(false)
    setShowToast(true)
  } else {
    getImageFromS3(String(data.fileFullName)).then(url => {
      setIsLoading(false)
      if (url.length !== 0) {
        setIsSuccess(true)
        setImageURL(url)
      } else {
        setErrorMessage('다시 시도해주세요.')
        setShowToast(true)
      }
    })
  }
}

export { handleImageUpload }
