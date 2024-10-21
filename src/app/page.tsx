import Image from 'next/image'
import LoginButton from '@/widgets/join/ui/LoginButton'
import FlexBox from '@/shared/ui/Flexbox'
import axios from 'axios'
import { redirect } from 'next/navigation'
import axiosServerInstance from '@/shared/model/serverNetwork'
import styles from './page.module.css'

async function fetchAccountInfo() {
  try {
    const response = await axiosServerInstance.get('/v1/my')
    // eslint-disable-next-line prefer-destructuring
    const data = response.data
    return data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) console.log('no access token')
    return undefined
  }
}

export default async function Home() {
  // eslint-disable-next-line prefer-destructuring
  const accountInfo = await fetchAccountInfo()
  if (accountInfo) {
    const { storeId } = accountInfo.relationList[0].storeId
    redirect(`/${storeId}/home`)
  }

  return (
    <FlexBox
      direction="col"
      className="bg-black items-center w-full h-full justify-center pt-16 pb-spacing-08 gap-spacing-04 relative"
    >
      <div className={styles.titleAnimation}>
        <Image height={38} width={234} alt="text" src="/image/eollugage_title.png" />
      </div>
      <FlexBox direction="col" className={`${styles.bodyAnimation} justify-between w-full h-full`}>
        <div className="text-Gray-40 body-02-regular">간편하게 일하는 법</div>
        <div className={styles.backgroundImage} />
        <div className="w-full px-spacing-04">
          <LoginButton />
        </div>
      </FlexBox>
    </FlexBox>
  )
}
