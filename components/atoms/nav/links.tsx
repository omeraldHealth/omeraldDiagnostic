

import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { classNames, privateRoutes } from 'utils/static';

export const NavLinks = () => {
    const [currentNavigation, setCurrentNavigation] = useState<any>(privateRoutes[0]);
    const router = useRouter();
    
    const handleNavigationChange = (nav: any) => {
        console.log(nav)
        setCurrentNavigation(nav);
    };
    

    return <nav className="">
        {privateRoutes.map((item) => (
            <a href='#' onClick={() => handleNavigationChange(item)}
                className={classNames(
                item.name === currentNavigation.name
                    ? "bg-white text-gray-400 border-0 my-4"
                    : "text-white hover:bg-white hover:text-gray-600 hover:bg-opacity-75",
                "group flex items-center px-6 py-2 text-sm font-medium rounded-l-md my-4"
                )}>
                <item.icon
                className="mr-3 flex-shrink-0 h-6 w-6 text-gray-500"
                aria-hidden="true"
                />
                {item.name}
            </a>
        ))}
    </nav>
}


