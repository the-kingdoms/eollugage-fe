'use client'

/* eslint-disable object-curly-newline */
/* eslint-disable arrow-parens */
import { z } from 'zod'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AddAttendanceButton } from '@/features'
import Header from './Header'
import SelectWorkerDrawer from './SelectWorkerDrawer'
import SelectWorkingDateCalendar from './SelectWorkingDateCalendar'
import SelectWorkingTime from './SelectWorkingTime'

const formSchema = z.object({
  workerID: z.string(),
  workingDate: z.date(),
  workingTime: z.object({
    start: z.string(),
    end: z.string(),
  }),
})

export default function AddAttendanceForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workerID: '',
      workingDate: undefined,
      workingTime: {
        start: '',
        end: '',
      },
    },
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Header />

      <Form {...form}>
        <form>
          <div className="px-4 space-y-[16px]">
            <SelectWorkerDrawer form={form} />
            <SelectWorkingDateCalendar form={form} />
            <SelectWorkingTime form={form} />
          </div>
          <div className="w-full ">
            <div className="fixed bottom-[12px] w-full px-[16px] ">
              <AddAttendanceButton />
            </div>
          </div>
        </form>
      </Form>
    </LocalizationProvider>
  )
}
