/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-parens */
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { UseFormReturn } from 'react-hook-form'

export default function SelectWorkingDateCalendar({
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
      name="workingDate"
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-1">
          <FormLabel className="body-02-regular text-[#6F6F6F]">근무 날짜</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-[20px] font-medium h-[56px]',
                    !field.value && 'text-[#A8A8A8]',
                  )}
                >
                  {field.value ? (
                    format(new Date(field.value), 'yyyy년 MM월 dd일')
                  ) : (
                    <span>근무한 날짜를 선택해주세요</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={date => date > new Date() || date < new Date('1900-01-01')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  )
}
