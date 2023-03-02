import { Tabs } from 'antd';
import { Fragment } from 'react'
import { settingsTab } from 'utils/static';
import { Activity } from '../settingsTabs/activity';
import { Billing } from '../settingsTabs/billing';
import { BranchManagement } from '../settingsTabs/branchMan';
import { EmployeeManagement } from '../settingsTabs/employe';
import { PathalogistManagement, PathlogistManagement, PathologistManagement } from '../settingsTabs/pathologis';
import { Support } from '../settingsTabs/support';

const components = [
  <Billing />,
  <Activity />,
  <EmployeeManagement  />,
  <BranchManagement  />,
  <PathologistManagement />,
  <Support/>
]

export default function SettingsTab() {
  return (
    <Fragment>
          <div className="p-4 sm:p-6 xl:p-8 h-[112vh] sm:h-[92vh] bg-signBanner flex w-100 justify-center">
          <div className='w-[70vw] bg-white shadow-lg mt-10 h-[70vh] rounded-lg] p-8'>
            <Tabs
                defaultActiveKey="0"
                style={{
                  height: 220,
                }}
                items={settingsTab.map((_, i) => {
                  const id = String(i);
                  return {
                    label: settingsTab[i],
                    key: id,
                    children: <>{components[i]}</>
                  };
                })}
              />
          </div>
        </div>
    </Fragment>   
  )
}
