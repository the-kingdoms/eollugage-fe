'use client'

import { Avatar } from '@eolluga/eolluga-ui'
import { useAtom } from 'jotai'
import { Member } from '@/entities'
import { selectedMemberAtom } from '../atoms/workManagementAtoms'

export default function MemberItem({ member }: { member: Member }) {
  const [selectedMemberIDAtom, setSelectedMemberIDAtom] = useAtom(selectedMemberAtom)
  return (
    <button
      className="h-[90px] w-[48px] flex flex-col space-y-1 items-center justify-end text-center"
      type="button"
      onClick={() => setSelectedMemberIDAtom(member.id)}
    >
      <span
        className={`${selectedMemberIDAtom === member.id ? 'border border-white rounded-full' : 'opacity-70'}`}
      >
        <Avatar size="S" image={member?.image || undefined} />
      </span>
      <div>
        <p
          className={`body-02-medium-compact  ${selectedMemberIDAtom === member.id ? 'text-white' : 'text-[#8D8D8D]'}`}
        >
          {member.name}
        </p>
        <p
          className={`body-01-medium-compact ${selectedMemberIDAtom === member.id ? 'text-[#6F6F6F]' : 'text-[#8D8D8D]'}`}
        >
          {member.position}
        </p>
      </div>
    </button>
  )
}
