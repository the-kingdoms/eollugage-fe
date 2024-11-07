import { useAtomValue } from 'jotai'
import { useMembers } from '@/entities'
import MemberList from './MemberList'
import { selectedMemberAtom } from '../atoms/workManagementAtoms'
import formatPhoneNumber from '../utils/formatPhoneNumber'
import { Flexbox } from '@/shared'

export default function MemberSelector({ storeId }: { storeId: string }) {
  const { members } = useMembers(storeId)
  const selectedMemberID = useAtomValue(selectedMemberAtom)
  return (
    <div className="h-[194px] pb-spacing-04 pt-spacing-06 bg-button-primary text-text-on-color overflow-hidden">
      <Flexbox className="flex space-x-spacing-02 mb-spacing-04 px-spacing-04">
        <h2 className="body-03-bold-compact">근무자</h2>
        <p className="body-01-medium-compact text-text-on-placeholder">근무자를 선택해주세요</p>
      </Flexbox>
      <MemberList members={members} />
      <p className="body-03-bold-compact mt-spacing-03 px-spacing-04">
        {selectedMemberID === null
          ? members && formatPhoneNumber(members[0].phoneNumber)
          : formatPhoneNumber(
              members?.find(member => member.memberId === selectedMemberID)?.phoneNumber || '',
            )}
      </p>
    </div>
  )
}
