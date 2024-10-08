import { useState, Fragment } from 'react';
import { useRecoilState } from 'recoil';
import Image from 'next/image';
import { dashTabs } from '@/utils/recoil';
import { classNames, privateRoutes } from '@/utils/constants/common';
import { logoRectUrl } from '@/utils/constants/cloudinary';

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [dashTab, setDashTab] = useRecoilState(dashTabs);

  const handleSidebarToggle = () => setShowSidebar(!showSidebar);

  const handleClick = (item: any) => {
    setDashTab(item.name);
    handleSidebarToggle();
  };

  return (
    <aside
      className={`bg-gradient-to-b from-blue-700 to-gray-800 side-bar lg:block min-h-screen w-[70%] sm:w-[40%] md:w-[40%] xl:w-[100%] bg-blue-900 relative p-4 sm:pl-8 pr-0 shrink-0 ${showSidebar ? '' : 'hidden'}`}
      aria-label="Sidebar"
    >
      <div className="bg-gray-200 mr-8">
        <a href="/">
          <Image src={logoRectUrl} alt="logo" width={150} height={57.75} />
        </a>
      </div>
      <div className="mb-8">
        {privateRoutes.map((item: any) => (
          <Fragment key={item.name}>
            <a
              href="#"
              onClick={() => handleClick(item)}
              className={classNames(
                item.name === dashTab
                  ? 'bg-white text-gray-400 border-0 my-6'
                  : 'text-white hover:bg-white hover:text-gray-600 hover:bg-opacity-75',
                'group flex items-center px-6 py-2 text-sm font-medium rounded-l-md my-6',
              )}
            >
              <item.icon
                className={`mr-3 flex-shrink-0 h-6 w-6 ${item.name === dashTab ? 'text-black' : 'text-white'}`}
                aria-hidden="true"
              />
              {item.name}
            </a>
          </Fragment>
        ))}
      </div>
      <p className="text-sm text-center text-white font-semi-bold absolute bottom-10">
        Copyright{' '}
        <a
          href="https://omerald.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          @Omerald
        </a>{' '}
        2024. <br />
        All Rights Reserved.
      </p>
    </aside>
  );
}
