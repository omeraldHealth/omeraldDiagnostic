import { Fragment, useState } from 'react';
import { useRecoilState } from 'recoil';
import { dashTabs } from 'components/common/recoil/dashboard/index';
import { classNames, privateRoutes } from '../../../utils/static';
import Image from 'next/image';
import { useManagerValue, useProfileValue } from '@components/common/constants/constants';

export default function Sidebar() {
  const currentManager = useManagerValue()
  const [showSidebar, setShowSidebar] = useState(true);
  const [dashTab, setDashTab] = useRecoilState(dashTabs);

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };  

  const handleClick = (item:any) => {
    setDashTab(item.name);
    handleSidebarToggle();
  };
  
  return (
    <aside
    className={`side-bar lg:block min-h-screen w-[70%] sm:w-[40%] md:w-[40%] xl:w-[100%] bg-orange-400 relative p-4 sm:pl-8 pr-0 shrink-0 ${
      showSidebar ? '' : 'hidden'
    }`}
    aria-label="Sidebar"
  >
    <div className="mb-4">
      <a href="/">
        <Image src="/logo.png" alt="logo" width={171} height={57.75} />
      </a>
    </div>
    <div className="mb-8">
      {privateRoutes.map((item) => (
        <Fragment key={item.name}>
          {!item?.allowedRoles?.includes(currentManager?.managerRole?.toLowerCase())  ? null : (
            <a
              key={item.name}
              href="#"
              onClick={() => handleClick(item)}
              className={classNames(
                item.name === dashTab ? "bg-white text-gray-400 border-0 my-6" : "text-white hover:bg-white hover:text-gray-600 hover:bg-opacity-75",
                "group flex items-center px-6 py-2 text-sm font-medium rounded-l-md my-6"
              )}
            >
              <item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-gray-500" aria-hidden="true" />
              {item.name}
            </a>
          )}
        </Fragment>
      ))}
    </div>
    <p className="text-sm text-center text-green-900 font-semi-bold absolute bottom-10">
      Copyright <a href="https://omerald.com/" target="_blank"> @Omerald </a> 2023. <br />All Rights Reserved.
    </p>
    </aside>  
  );
}



