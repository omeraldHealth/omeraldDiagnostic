//@ts-nocheck
import { Tooltip } from 'antd';
import { useCurrentBranch, useDCProfileValue } from '@/utils/recoil/values';
import { useSetRecoilState } from 'recoil';
import { dashTabs } from '@/utils/recoil';
import {
  BeakerIcon,
  ChartBarIcon,
  ShareIcon,
  UserIcon,
} from '@heroicons/react/20/solid';

const DashCard = () => {
  const currentBranch = useCurrentBranch();
  const currentProfile = useDCProfileValue();
  const setDashTab = useSetRecoilState(dashTabs);

  const dashCard = [
    {
      href: '/test',
      style: 'bg-gradient-to-r from-blue-500 to-purple-500',
      icon: <BeakerIcon className="w-8 h-8" />,
      tipInfo: 'Tests your laboratory offers.',
      title: 'Tests Offered',
      value: currentProfile?.tests?.length || 0,
    },
    {
      href: '/reports',
      style: 'bg-gradient-to-r from-indigo-500 to-blue-500',
      icon: <ChartBarIcon className="w-8 h-8" />,
      tipInfo: 'Reports uploaded in your system.',
      title: 'Reports Uploaded',
      value: currentBranch?.reports?.length || 0,
    },
    {
      href: '/reports/shared',
      style: 'bg-gradient-to-r from-gray-500 to-gray-700',
      icon: <ShareIcon className="w-8 h-8" />,
      tipInfo: 'Reports shared with patients.',
      title: 'Reports Shared',
      value: currentBranch?.sharedReport?.length || 0,
    },
    {
      href: '/settings',
      style: 'bg-gradient-to-r from-green-500 to-teal-500',
      icon: <UserIcon className="w-8 h-8" />,
      tipInfo: 'Total users in the system.',
      title: 'Total Users',
      value: 1 + (currentBranch?.operators?.length || 0),
    },
  ];

  const navigateDashboard = (title) => {
    switch (title) {
      case 'Tests Offered':
        return 'Tests Offered';
      case 'Reports Uploaded':
        return 'View Reports';
      case 'Reports Shared':
        return 'View Reports';
      case 'Total Users':
        return 'Settings';
      default:
        return '';
    }
  };

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
      {dashCard.map((dash, index) => (
        <a
          key={index}
          href={'#'}
          onClick={() => setDashTab(navigateDashboard(dash.title))}
          className={`p-4 rounded-lg shadow-lg text-white transition-transform transform hover:scale-105 ${dash.style}`}
        >
          <Tooltip title={dash.tipInfo} color="#f59e0b">
            <div className="flex items-center justify-between min-h-[10vh]">
              {dash.icon}
              <div className="text-right">
                <p className="text-3xl font-bold">{dash.value}</p>
                <p className="text-sm font-light">{dash.title}</p>
              </div>
            </div>
          </Tooltip>
        </a>
      ))}
    </section>
  );
};

export default DashCard;
