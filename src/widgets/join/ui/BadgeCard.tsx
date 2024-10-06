import FlexBox from '@/component/shared/flexbox'
import Image from 'next/image'

export default function BadgeCard() {
  return (
    <FlexBox direction="col" className="relative w-full h-full">
      <div
        className="w-[232px] h-[336px] rounded-[16px] border-r-2 border-b-2"
        style={{
          background:
            'linear-gradient(155deg, var(--Background-inverse, #393939) 0%, var(--Background-brand, #131313) 100%)',
          borderColor: 'var(--Border-inverse, #161616)',
        }}
      >
        <FlexBox direction="col" className="gap-spacing-05 p-spacing-05">
          <div className="w-[192px] h-[51px]">
            <Image alt="text1" src="/image/eollugage_badge_text1.svg" />
          </div>
          <div className="w-[192px] h-[49px]">
            <Image alt="text2" src="/image/eollugage_badge_text2.svg" />
          </div>
        </FlexBox>
        <div className="body-05-bold-compact text-text-on-white pl-spacing-05 mt-[108px]">
          얼루가게
          <br />
          출입증
        </div>
      </div>
    </FlexBox>
  )
}
