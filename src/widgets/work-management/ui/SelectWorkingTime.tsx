/* eslint-disable no-nested-ternary */
import { FormField, FormItem, FormLabel } from '@/shared/ui/shadcn/form'
import { Input } from '@/shared/ui/shadcn/input'
import { cn } from '@/shared/utils/cn'
import { Form } from '../types/work-management'

export default function SelectWorkingTime({ form }: { form: Form }) {
  const handleInputChange = (
    field: { onChange: (value: string) => void },
    value: string,
    max: number,
  ) => {
    if (value && !/^\d*$/.test(value)) {
      field.onChange('')
      return
    }

    if (value === '') {
      field.onChange('')
      return
    }

    let numValue = Number(value)
    if (numValue < 0) numValue = 0
    if (numValue > max) numValue = max

    const formattedValue = numValue < 10 ? `0${numValue}` : `${numValue}`
    field.onChange(formattedValue)
  }

  return (
    <FormItem className="flex flex-col space-y-4">
      {/* 출근 시간 */}
      <div className="space-y-1">
        <FormLabel className="body-02-regular text-[#6F6F6F]">출근 시간</FormLabel>
        <div className="flex items-center">
          {/* 출근 시간: 시 */}
          <FormField
            control={form.control}
            name="workingTime.start-front"
            render={({ field }) => (
              <Input
                type="text"
                inputMode="numeric"
                className={cn(
                  'w-1/2 justify-start label-04-medium h-[56px] placeholder:text-text-placeholder',
                  field.value !== '' && 'border-border-strong-01',
                )}
                value={field.value === '' ? '' : field.value}
                onChange={e => handleInputChange(field, e.target.value, 23)}
                placeholder="12"
              />
            )}
          />
          <span className="mx-2">:</span>
          {/* 출근 시간: 분 */}
          <FormField
            control={form.control}
            name="workingTime.start-back"
            render={({ field }) => (
              <Input
                type="text"
                inputMode="numeric"
                className={cn(
                  'w-1/2 justify-start label-04-medium h-[56px] placeholder:text-text-placeholder',
                  field.value !== '' && 'border-border-strong-01',
                )}
                value={field.value === '' ? '' : field.value}
                onChange={e => handleInputChange(field, e.target.value, 59)}
                placeholder="00"
              />
            )}
          />
        </div>
      </div>

      {/* 퇴근 시간 */}
      <div className="space-y-1">
        <FormLabel className="body-02-regular mt-4 text-[#6F6F6F]">퇴근 시간</FormLabel>
        <div className="flex items-center">
          {/* 퇴근 시간: 시 */}
          <FormField
            control={form.control}
            name="workingTime.end-front"
            render={({ field }) => (
              <Input
                type="text"
                inputMode="numeric"
                className={cn(
                  'w-1/2 justify-start label-04-medium h-[56px] placeholder:text-text-placeholder',
                  field.value !== '' && 'border-border-strong-01',
                )}
                value={field.value === '' ? '' : field.value}
                onChange={e => handleInputChange(field, e.target.value, 23)}
                placeholder="18"
              />
            )}
          />
          <span className="mx-2">:</span>
          {/* 퇴근 시간: 분 */}
          <FormField
            control={form.control}
            name="workingTime.end-back"
            render={({ field }) => (
              <Input
                type="text"
                inputMode="numeric"
                className={cn(
                  'w-1/2 justify-start label-04-medium h-[56px] placeholder:text-text-placeholder',
                  field.value !== '' && 'border-border-strong-01',
                )}
                value={field.value === '' ? '' : field.value}
                onChange={e => handleInputChange(field, e.target.value, 59)}
                placeholder="30"
              />
            )}
          />
        </div>
      </div>
    </FormItem>
  )
}
