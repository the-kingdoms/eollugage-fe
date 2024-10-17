/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-parens */
import { useEmployee } from '@/entities'
import { storeIdAtom } from '@/shared'
import { Button } from '@/shared/ui/shadcn/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/shadcn/drawer'
import { FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/shadcn/form'
import { cn } from '@/shared/utils/cn'
import { Icon } from '@eolluga/eolluga-ui'
import { useAtomValue } from 'jotai'
import { UseFormReturn } from 'react-hook-form'

export default function SelectEmployeeDrawer({
  form,
}: {
  form: UseFormReturn<
    {
      employeeID: string
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
  const storeId = useAtomValue(storeIdAtom)
  const { employees } = useEmployee(storeId)
  return (
    <FormField
      control={form.control}
      name="employeeID"
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-1">
          <FormLabel className="body-02-regular text-[#6F6F6F]">근무자 선택</FormLabel>
          <FormControl>
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start label-04-medium h-[56px] border-border-strong-01 focus:border-border-strong-01',
                    !field.value && 'text-[#A8A8A8] border-[hsl(var(--input))]',
                  )}
                >
                  {field.value ? (
                    employees?.find(employee => employee.id === field.value)?.name
                  ) : (
                    <span>근무자를 선택해주세요</span>
                  )}
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>근무자 선택</DrawerTitle>
                  <DrawerDescription className="hidden" />
                </DrawerHeader>
                <div className="flex flex-col  ">
                  {employees?.map(employee => (
                    <DrawerClose key={employee.id} asChild>
                      <Button
                        variant="ghost"
                        className={`justify-start ${field.value === employee.id ? 'text-[#161616]' : 'text-[#6F6F6F]'} body-02-medium `}
                        onClick={() => field.onChange(employee.id)}
                      >
                        {employee.name}
                        {employee.id === field.value && (
                          <span className="ml-auto">
                            <Icon icon="checkmark" />
                          </span>
                        )}
                      </Button>
                    </DrawerClose>
                  ))}
                </div>
              </DrawerContent>
            </Drawer>
          </FormControl>
        </FormItem>
      )}
    />
  )
}
