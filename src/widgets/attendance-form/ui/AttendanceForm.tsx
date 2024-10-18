'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */

import { z } from 'zod'
import { Form } from '@/shared/ui/shadcn/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHistory } from '@/entities'
import { useAtomValue } from 'jotai'
import { storeIdAtom } from '@/shared'
import useAttendance from '@/widgets/work-management/hooks/useAttendance'
import { format } from 'date-fns'
import Header from './Header'
import SelectWorkingDateCalendar from './SelectWorkingDateCalendar'
import SelectWorkingTime from './SelectWorkingTime'
import AddAttendanceButton from './AttendanceButton'
import SelectMemberDrawer from './SelectMemberDrawer'

const timeSchema = z.string().regex(/^\d{2}:\d{2}$/, '시간을 잘 못 입력했어요. (예: HH:MM)')
const formSchema = z.object({
  memberID: z.string(),
  workingDate: z.date(),
  workingTime: z.object({
    start: timeSchema,
    end: timeSchema,
  }),
})
export default function AttendanceForm({
  type,
  defaultMemberId,
}: {
  type: 'add' | 'edit'
  defaultMemberId?: string
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberID: '',
      workingDate: undefined,
      workingTime: {
        start: '',
        end: '',
      },
    },
  })
  const storeId = useAtomValue(storeIdAtom)
  const { memberId } = useAttendance()
  const { createHistory } = useHistory(storeId)
  const memberID = form.watch('memberID')
  const workingDate = form.watch('workingDate')
  const workingTime = form.watch('workingTime')

  const isFormComplete =
    memberID !== '' &&
    workingDate !== undefined &&
    workingTime.end !== '' &&
    workingTime.start !== ''

  const handleSubmit = () => {
    createHistory({
      selectedMemberId: memberId,
      reqBody: {
        date: format(workingDate, 'yyyy-MM-dd'),
        startTime: workingTime.start,
        endTime: workingTime.end,
      },
    })
  }
  return (
    <>
      <Header type={type} />

      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <div className="px-4 space-y-[16px]">
            <SelectMemberDrawer form={form} />
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
    </>
  )
}
