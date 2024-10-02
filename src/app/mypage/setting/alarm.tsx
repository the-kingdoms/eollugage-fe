import { TopBar, Switch } from '@eolluga/eolluga-ui'
import { SettingsView } from '@/types/myPageTypes'

export default function AlarmPage({
  handleChangeView
}: {
  handleChangeView: (value: SettingsView) => void
}) {
  return (
    <div className="pt-4">
      <TopBar
        leftIcon="close"
        title="알림"
        onClickLeftIcon={() => handleChangeView('settings')}
      />
      <div className="mt-4">
        <ul className="flex flex-col gap-spacing-02 p-4">
          <li className="flex justify-between py-spacing-04">
            <span>신규 직원 합류 알림</span>
            <Switch state="enable" />
          </li>
        </ul>
      </div>
    </div>
  )
}
