import { Fragment, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { dashTabs } from 'components/common/recoil/dashboard/index';
import { classNames, privateRoutes } from '../../../utils/static/static';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useUserValues } from '@components/common/constants/recoilValues';
import { DiagnosticCenter, Branch } from 'types'; // Assuming you have defined these types

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [dashTab, setDashTab] = useRecoilState(dashTabs);
  const currentUser = useUserValues();
  const [currentBranch, setCurrentBranch] = useState<Branch | null>(null);

  useEffect(() => {
    try {
      const dcData: DiagnosticCenter = JSON.parse(Cookies.get('diagnosticCenter') || '{}');
      const branchData: Branch = JSON.parse(Cookies.get('selectedBranch') || '{}');

      if (currentUser && currentUser.diagnosticCenters) {
        const branch = fetchBranchByDiagnosticCenterId(currentUser.diagnosticCenters, dcData?._id, branchData?._id);
        setCurrentBranch(branch);
      }
    } catch (error) {
      console.error('Error parsing cookies', error);
    }
  }, [currentUser]);

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  const handleClick = (item: any) => {
    setDashTab(item.name);
    handleSidebarToggle();
  };

  return (
    <aside
      className={`side-bar lg:block min-h-screen w-[70%] sm:w-[40%] md:w-[40%] xl:w-[100%] bg-blue-900 relative p-4 sm:pl-8 pr-0 shrink-0 ${
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
            {item?.allowedRoles?.includes(currentBranch?.roleName?.toLowerCase() || '') && (
              <a
                key={item.name}
                href="#"
                onClick={() => handleClick(item)}
                className={classNames(
                  item.name === dashTab ? "bg-white text-gray-400 border-0 my-6" : "text-white hover:bg-white hover:text-gray-600 hover:bg-opacity-75",
                  "group flex items-center px-6 py-2 text-sm font-medium rounded-l-md my-6"
                )}
              >
                <item.icon className={`mr-3 flex-shrink-0 h-6 w-6 ${item.name === dashTab ? 'text-black' : 'text-white'}`} aria-hidden="true" />
                {item.name}
              </a>
            )}
          </Fragment>
        ))}
      </div>
      <p className="text-sm text-center text-green-900 font-semi-bold absolute bottom-10">
        Copyright <a href="https://omerald.com/" target="_blank" rel="noopener noreferrer"> @Omerald </a> 2023. <br />All Rights Reserved.
      </p>
    </aside>
  );
}

const fetchBranchByDiagnosticCenterId = (
  diagnosticCenters: DiagnosticCenter[], 
  dcId: string, 
  branchId: string
): Branch | null => {
  for (const center of diagnosticCenters) {
    if (center.diagnostic._id === dcId) {
      const branch = center.branches.find(branch => branch.branchId === branchId);
      if (branch) {
        return branch;
      }
    }
  }
  return null; // Return null if no matching branch is found
};
