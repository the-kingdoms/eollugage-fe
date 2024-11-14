import { useAtomValue } from 'jotai'
import { useMembers } from '@/entities'
import MemberList from './MemberList'
import { selectedMemberAtom } from '../atoms/workManagementAtoms'
import formatPhoneNumber from '../utils/formatPhoneNumber'

export default function MemberSelector({ storeId }: { storeId: string }) {
  const { members } = useMembers(storeId)
  const selectedMemberID = useAtomValue(selectedMemberAtom)
  return (
    <div className="h-[194px] bg-[#131313] text-white overflow-hidden">
      <div className="flex space-x-[8px] p-4 ">
        <h2 className="body-03-bold-compact">근무자</h2>
        <p className="body-01-medium-compact text-[#A8A8A8]">근무자를 선택해주세요</p>
      </div>
      <MemberList members={members} />
      <p className="body-03-bold-compact mt-[12px] px-[16px]">
        {selectedMemberID === null
          ? members && formatPhoneNumber(members[0].phoneNumber)
          : formatPhoneNumber(
              members?.find(member => member.memberId === selectedMemberID)?.phoneNumber || '',
            )}
      </p>
    </div>
  )
}
