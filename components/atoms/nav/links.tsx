import React, { useState } from 'react';
import { classNames, privateRoutes } from 'utils/static/static';
import { useAuthContext } from 'utils/context/auth.context';
import { useMediaQuery } from 'react-responsive';

interface NavLinksProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavLinks: React.FC<NavLinksProps> = ({ setSidebarOpen }) => {
  const [currentNavigation, setCurrentNavigation] = useState<any>(privateRoutes[0]);
  const monitor = useMediaQuery({ minWidth: 1224 });
  const { operator } = useAuthContext();

  const handleNavigationChange = (nav: any) => {
    !monitor && setSidebarOpen(false);
    setCurrentNavigation(nav);
  };

  return (
    <nav className="">
      {privateRoutes
        .filter((item) => !item.allowedRoles || item.allowedRoles.includes(operator?.managerRole.toLowerCase()))
        .map((item) => (
          <a
            key={item.name}
            href="#"
            onClick={() => handleNavigationChange(item)}
            className={classNames(
              item.name === currentNavigation.name
                ? 'bg-white text-gray-400 border-0 my-6'
                : 'text-white hover:bg-white hover:text-gray-600 hover:bg-opacity-75',
              'group flex items-center px-6 py-2 text-sm font-medium rounded-l-md my-6'
            )}
          >
            <item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-gray-500" aria-hidden="true" />
            {item.name}
          </a>
        ))}
    </nav>
  );
};
