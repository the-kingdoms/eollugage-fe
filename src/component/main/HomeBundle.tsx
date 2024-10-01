import FlexBox from '../shared/flexbox'

interface HomeBundleProps {
  title: string
  description?: string
  rightChildren: React.ReactNode
  underChildren: React.ReactNode
}

export default function HomeBundle({ title, description, rightChildren, underChildren }: HomeBundleProps) {
  return (
    <FlexBox direction="col" className="gap-3 w-full">
      <FlexBox className="w-full justify-between items-start">
        <div>
          <div className="body-03-bold-compact">{title}</div>
          <div className="body-01-medium-compact text-text-helper mt-1">{description}</div>
        </div>
        {rightChildren}
      </FlexBox>
      {underChildren}
    </FlexBox>
  )
}
