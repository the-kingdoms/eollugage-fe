/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-parens */

import { FormField, FormItem, FormLabel } from '@/components/ui/form'
import { MobileTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
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
            <MobileTimePicker
              value={field.value.start ? dayjs(field.value.start) : null}
              onChange={newValue => {
                field.onChange({
                  ...field.value,
                  start: newValue ? newValue.format('HH:mm') : '',
                })
              }}
              label="출근 시간"
              className="w-1/2"
            />

            <MobileTimePicker
              className="w-1/2"
              value={field.value.end ? dayjs(field.value.end) : null}
              onChange={newValue => {
                field.onChange({
                  ...field.value,
                  end: newValue ? newValue.format('HH:mm') : '',
                })
              }}
              label="퇴근 시간"
            />
          </div>
        </FormItem>
      )}
    />
  )
}
