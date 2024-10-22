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
import SelectMemberDrawer from './SelectMemberDrawer'
import useAttendance from '../hooks/useAttendance'

const timeSchema = z.string().regex(/^\d{2}:\d{2}$/, '시간을 잘못 입력했어요. (예: HH:MM)')
const formSchema = z.object({
  memberId: z.string(),
  workingDate: z.date(),
  workingTime: z.object({
    start: timeSchema,
    end: timeSchema,
  }),
})

export default function AttendanceForm({
  storeId,
  type,
  historyId,
}: {
  storeId: string
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
      memberId: '',
      workingDate: undefined,
      workingTime: {
        start: '',
        end: '',
      },
    },
  })

  const { memberId } = useAttendance()
  const { createHistory, updateHistory } = useHistory(storeId)

  useEffect(() => {
    if (type === 'edit' && editingHistory) {
      form.setValue('memberId', editingHistory.memberId)
      form.setValue('workingDate', new Date(editingHistory.date))
      form.setValue('workingTime', {
        start: editingHistory.startTime,
        end: editingHistory.endTime,
      })
    }
  }, [editingHistory])

  const isFormComplete =
    form.watch('memberId') !== '' &&
    form.watch('workingDate') !== undefined &&
    form.watch('workingTime').end !== '' &&
    form.watch('workingTime').start !== ''

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (data.memberId === null) return
    if (type === 'add') {
      createHistory({
        selectedMemberId: data.memberId,
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
            <SelectMemberDrawer form={form} storeId={storeId} />
            <SelectWorkingDateCalendar form={form} />
            <SelectWorkingTime form={form} />
          </div>
          <div className="w-full">
            <div
              className={`fixed bottom-[12px] w-full px-[16px] ${
                isFormComplete ? 'block' : 'hidden'
              }`}
            >
              <button
                type="submit"
                className=" label-03-bold w-full h-[64px] py-spacing-05 px-spacing-07 gap-spacing-04 flex justify-center items-center bg-button-primary text-text-on-color rounded-radius-04"
              >
                근무 추가하기
              </button>
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}
