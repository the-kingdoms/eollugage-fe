'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-trailing-spaces */
import { z } from 'zod'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Form } from '@/shared/ui/shadcn/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { LocalizationProvider } from '@mui/x-date-pickers'
import Header from './Header'
import SelectWorkingDateCalendar from './SelectWorkingDateCalendar'
import SelectWorkingTime from './SelectWorkingTime'
import AddAttendanceButton from './AttendanceButton'
import SelectEmployeeDrawer from './SelectEmployeeDrawer'

const timeSchema = z.string().regex(/^\d{2}:\d{2}$/, '시간을 잘 못 입력했어요. (예: HH:MM)')
const formSchema = z.object({
  employeeID: z.string(),
  workingDate: z.date(),
  workingTime: z.object({
    start: timeSchema,
    end: timeSchema,
  }),
})
export default function AttendanceForm({
  type,
  defaultEmployeeId,
}: {
  type: 'add' | 'edit'
  defaultEmployeeId?: string
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeID: '',
      workingDate: undefined,
      workingTime: {
        start: '',
        end: '',
      },
    },
  })

  const employeeID = form.watch('employeeID')
  const workingDate = form.watch('workingDate')
  const workingTime = form.watch('workingTime')

  const isFormComplete =
    employeeID !== '' &&
    workingDate !== undefined &&
    workingTime.end !== '' &&
    workingTime.start !== ''

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Header type={type} />

      <Form {...form}>
        <form>
          <div className="px-4 space-y-[16px]">
            <SelectEmployeeDrawer form={form} />
            <SelectWorkingDateCalendar form={form} />
            <SelectWorkingTime form={form} />
          </div>
          <div className="w-full">
            <div
              className={`fixed bottom-[12px] w-full px-[16px] ${
                isFormComplete ? 'block' : 'hidden'
              }`}
            >
              <AddAttendanceButton />
            </div>
          </div>
        </form>
      </Form>
    </LocalizationProvider>
  )
}
