import { useAuth } from '@/lib/auth';
import { Radio, Tabs } from 'antd';
import { useState } from 'react';
import {SettingsTable} from "../../settings/activity/activityTable"

export const SettingsTab = () => {
  const [mode, setMode] = useState('top');
  const {diagnosticDetails} = useAuth();
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  
  const settings = ["Activity Feed","Employee Management","Branch Management","Billing","Support"]

  const components = [
    <SettingsTable data={diagnosticDetails.activities} ind={0} />,
    <SettingsTable data={diagnosticDetails.managersDetail} ind={1} />
  ]

  return (
    <div>
      <Tabs
        defaultActiveKey="0"
        tabPosition={mode}
        style={{
          height: 220,
        }}
        items={settings.map((_, i) => {
          const id = String(i);
          return {
            label: settings[i],
            key: id,
            disabled: i === 5,
            children: <>{components[i]}</>
          };
        })}
      />
    </div>
  );
};