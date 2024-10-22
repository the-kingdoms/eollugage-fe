/* eslint-disable no-nested-ternary */
import { FormField, FormItem, FormLabel } from '@/shared/ui/shadcn/form'
import { Input } from '@/shared/ui/shadcn/input'
import { cn } from '@/shared/utils/cn'
import { UseFormReturn } from 'react-hook-form'

export default function SelectWorkingTime({
  form,
}: {
  form: UseFormReturn<
    {
      memberId: string
      workingDate: Date
      workingTime: {
        start: string
        end: string
      }
    },
    unknown,
    undefined
  >
}) {
  return (
    <FormField
      control={form.control}
      name="workingTime"
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-4">
          <div className="space-y-1">
            <FormLabel className="body-02-regular text-[#6F6F6F]">출근 시간</FormLabel>
            <div className="flex items-center">
              <Input
                type="number"
                min={0}
                max={23}
                inputMode="numeric"
                className={cn(
                  'w-1/2 justify-start label-04-medium h-[56px] border-border-strong-01 focus:border-border-strong-01 placeholder:text-text-placeholder',
                  (field.value.start === '' ||
                    (field.value.start.includes(':') &&
                      field.value.start.split(':')[0] === '00')) &&
                    'border-[hsl(var(--input))]',
                )}
                value={
                  field.value.start.split(':')[0] === '00'
                    ? ''
                    : `${field.value.start.split(':')[0]}`
                }
                onChange={e => {
                  field.onChange({
                    ...field.value,
                    start: `${Number(e.target.value) > 23 ? 23 : Number(e.target.value) < 0 ? 0 : e.target.value || '00'}:${field.value.start.split(':')[1] || '00'}`,
                  })
                }}
                placeholder="12"
              />
              <span className="mx-2">:</span>
              {/* <span className="text-lg ml-2 mr-4">시</span> */}
              <Input
                type="number"
                min={0}
                max={59}
                inputMode="numeric"
                className={cn(
                  'w-1/2 justify-start label-04-medium h-[56px] border-border-strong-01 focus:border-border-strong-01 placeholder:text-text-placeholder',
                  (field.value.start === '' ||
                    (field.value.start.includes(':') &&
                      field.value.start.split(':')[1] === '00')) &&
                    'border-[hsl(var(--input))]',
                )}
                value={
                  field.value.start.split(':')[1] === '00'
                    ? ''
                    : `${field.value.start.split(':')[1]}`
                }
                onChange={e => {
                  const hours = field.value.start.split(':')[0] || '00'
                  field.onChange({
                    ...field.value,
                    start: `${hours}:${Number(e.target.value) > 59 ? 59 : Number(e.target.value) < 0 ? '00' : e.target.value || '00'}`,
                  })
                }}
                placeholder="00"
              />
              {/* <span className="text-lg ml-2">분</span> */}
            </div>
          </div>

          <div className="space-y-1">
            <FormLabel className="body-02-regular mt-4 text-[#6F6F6F]">퇴근 시간</FormLabel>
            <div className="flex  items-center">
              <Input
                type="number"
                min={0}
                max={23}
                inputMode="numeric"
                className={cn(
                  'w-1/2 justify-start label-04-medium h-[56px] border-border-strong-01 focus:border-border-strong-01 placeholder:text-text-placeholder',
                  (field.value.end === '' ||
                    (field.value.end.includes(':') && field.value.end.split(':')[0] === '00')) &&
                    'border-[hsl(var(--input))]',
                )}
                value={
                  field.value.end.split(':')[0] === '00' ? '' : `${field.value.end.split(':')[0]}`
                }
                onChange={e => {
                  field.onChange({
                    ...field.value,
                    end: `${Number(e.target.value) > 23 ? 23 : Number(e.target.value) < 0 ? 0 : e.target.value || '00'}:${field.value.end.split(':')[1] || '00'}`,
                  })
                }}
                placeholder="18"
              />
              {/* <span className="text-lg ml-2 mr-4">시</span> */}
              <span className="mx-2">:</span>
              <Input
                type="number"
                min={0}
                max={59}
                inputMode="numeric"
                className={cn(
                  'w-1/2 justify-start label-04-medium h-[56px] border-border-strong-01 focus:border-border-strong-01 placeholder:text-text-placeholder',
                  (field.value.end === '' ||
                    (field.value.end.includes(':') && field.value.end.split(':')[1] === '00')) &&
                    'border-[hsl(var(--input))]',
                )}
                value={
                  field.value.end.split(':')[1] === '00' ? '' : `${field.value.end.split(':')[1]}`
                }
                onChange={e => {
                  const hours = field.value.end.split(':')[0] || '00'
                  field.onChange({
                    ...field.value,
                    end: `${hours}:${Number(e.target.value) > 59 ? 59 : Number(e.target.value) < 0 ? '00' : e.target.value || '00'}`,
                  })
                }}
                placeholder="30"
              />
              {/* <span className="text-lg ml-2">분</span> */}
            </div>
          </div>
        </FormItem>
      )}
    />
  )
}
