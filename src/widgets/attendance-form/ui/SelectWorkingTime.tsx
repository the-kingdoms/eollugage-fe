/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-parens */

import { FormField, FormItem, FormLabel } from '@/shared/ui/shadcn/form'
import { Input } from '@/shared/ui/shadcn/input'
import { cn } from '@/shared/utils/cn'
import { UseFormReturn } from 'react-hook-form'

export default function SelectWorkingTime({
  form,
}: {
  form: UseFormReturn<
    {
      workerID: string
      workingDate: Date
      workingTime: {
        start: string
        end: string
      }
    },
    any,
    undefined
  >
}) {
  return (
    <FormField
      control={form.control}
      name="workingTime"
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-1">
          <FormLabel className="body-02-regular text-[#6F6F6F]">근무 시간</FormLabel>
          <div className="flex space-x-4">
            <Input
              type="string"
              value={field.value.start || ''}
              onChange={e => {
                field.onChange({
                  ...field.value,
                  start: e.target.value,
                })
              }}
              className={cn(
                'w-1/2 justify-start  label-04-medium h-[56px] border-border-strong-01 focus:border-border-strong-01 placeholder:text-text-placeholder',
                !field.value.start && ' border-[hsl(var(--input))]',
              )}
              aria-label="출근 시간"
              placeholder="예: 12:00"
            />

            <Input
              type="string"
              value={field.value.end || ''}
              onChange={e => {
                field.onChange({
                  ...field.value,
                  end: e.target.value,
                })
              }}
              className={cn(
                'w-1/2 justify-start  label-04-medium h-[56px] border-border-strong-01 focus:border-border-strong-01 placeholder:text-text-placeholder',
                !field.value.end && 'border-[hsl(var(--input))]',
              )}
              aria-label="퇴근 시간"
              placeholder="예: 18:00"
            />
          </div>
        </FormItem>
      )}
    />
  )
}
