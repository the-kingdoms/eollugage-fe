'use client'

import { z } from 'zod'
import { Form } from '@/shared/ui/shadcn/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHistory } from '@/entities'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import Header from './Header'
import SelectWorkingDateCalendar from './SelectWorkingDateCalendar'
import SelectWorkingTime from './SelectWorkingTime'
import AddAttendanceButton from './AttendanceButton'
import SelectMemberDrawer from './SelectMemberDrawer'
import useAttendance from '../hooks/useAttendance'

const timeSchema = z.string().regex(/^\d{2}:\d{2}$/, '시간을 잘못 입력했어요. (예: HH:MM)')
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
  historyId,
}: {
  type: 'add' | 'edit'
  historyId?: string
}) {
  const { data: editingHistory } = useQuery<{
    memberId: string
    date: string
    startTime: string
    endTime: string
  }>({
    queryKey: ['history', historyId],
  })

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

  const storeId = '123'
  const { memberId } = useAttendance()
  const { createHistory, updateHistory } = useHistory(storeId)

  useEffect(() => {
    if (type === 'edit' && editingHistory) {
      form.setValue('memberID', editingHistory.memberId)
      form.setValue('workingDate', new Date(editingHistory.date))
      form.setValue('workingTime', {
        start: editingHistory.startTime,
        end: editingHistory.endTime,
      })
    }
  }, [editingHistory])

  const isFormComplete =
    form.watch('memberID') !== '' &&
    form.watch('workingDate') !== undefined &&
    form.watch('workingTime').end !== '' &&
    form.watch('workingTime').start !== ''

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!memberId) return
    if (type === 'add') {
      createHistory({
        selectedMemberId: memberId,
        reqBody: {
          date: format(data.workingDate, 'yyyy-MM-dd'),
          startTime: data.workingTime.start,
          endTime: data.workingTime.end,
        },
      })
    } else {
      if (!historyId) return

      updateHistory({
        selectedMemberId: memberId,
        historyId,
        reqBody: {
          currentUserId: memberId,
          date: format(data.workingDate, 'yyyy-MM-dd'),
          startTime: data.workingTime.start,
          endTime: data.workingTime.end,
        },
      })
    }
  }

  return (
    <>
      <Header type={type} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
