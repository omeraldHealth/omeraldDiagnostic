import React from 'react';
import { BeakerIcon, ChartBarIcon, ShareIcon } from '@heroicons/react/20/solid';
import { Tooltip } from 'antd';
import { useSetRecoilState } from 'recoil';
import { dashTabs } from '../../common/recoil/dashboard';
import { settingTabState } from '../../common/recoil/settings';
import {
  useCurrentBranchValue,
  useProfileValue,
} from '@components/common/constants/recoilValues';

interface TooltipProps {
  tipInfo: string;
  icon?: React.ReactNode;
}

const CustomTooltip: React.FC<TooltipProps> = ({ tipInfo, icon }) => {
  return (
    <Tooltip color={'#e3a909'} title={tipInfo}>
      {icon}
    </Tooltip>
  );
};

export const DashCard = () => {
  const currentBranch = useCurrentBranchValue();
  const currentProfile = useProfileValue();

  const setDashTab = useSetRecoilState(dashTabs);
  const setActiveKey = useSetRecoilState(settingTabState);

  const dashCard: any[] = [
    {
      href: '/test',
      style: 'bg-blue-900',
      icon: <BeakerIcon className="w-10 h-10" />,
      tipInfo: 'The number of tests your laboratory offers.',
      title: 'Tests Offered',
      value: currentProfile?.tests?.length,
    },
    {
      href: '/reports',
      style: 'bg-indigo-900',
      icon: <ChartBarIcon className="w-10 h-10" />,
      tipInfo: 'The number of tests your laboratory offers',
      title: 'Reports Uploaded',
      value: currentBranch?.reports?.length,
    },
    {
      href: '/reports',
      style: 'bg-gray-500',
      icon: <ShareIcon className="w-10 h-10" />,
      tipInfo: 'The number of tests shared by your laboratory',
      title: 'Reports Shared',
      value: currentBranch?.sharedReport?.length,
    },
    {
      href: '/settings',
      style: 'bg-green-900',
      icon: <BeakerIcon className="w-10 h-10" />,
      tipInfo: 'The number of users in your diagnostic center',
      title: 'Total Users',
      value: 1 + (currentBranch?.operators?.length || 0),
    },
  ];

  return (
    <section className="my-6 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:flex justify-between">
      {dashCard?.map((dash, index) => (
        <a
          key={index}
          href="#"
          onClick={() =>
            setDashTab(navigateDashboard(dash?.title || '', setActiveKey))
          }
        >
          <section
            className={`md:w-[47vw] lg:w-[20vw] xl:w-[15vw] h-[12vh] sm:h-[14vh] p-2 flex justify-between rounded-md text-white ${dash.style}`}
          >
            {dash.icon && (
              <CustomTooltip tipInfo={dash.tipInfo} icon={dash.icon} />
            )}
            <span className="">
              {dash.icon && !dash.icon2 && (
                <CustomTooltip tipInfo={dash.tipInfo} />
              )}
              <p className="font-bold text-2xl flex justify-center my-2 mt-4">
                {dash.value ?? 0}
              </p>
              <p className="font-light text-xs xl:text-sm -mt-2">
                {dash.title}
              </p>
            </span>
          </section>
        </a>
      ))}
    </section>
  );
};

const navigateDashboard = (tilte: string, setActiveKey: () => {}) => {
  switch (tilte) {
    case 'Tests Offered':
      return 'Tests Offered';
    case 'Reports Uploaded':
      return 'View Reports';
    case 'Reports Shared':
      return 'View Reports';
    case 'Total Users':
      setActiveKey('3');
      return 'Settings';
  }
};
