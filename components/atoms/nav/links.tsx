

import React, { useEffect, useState } from 'react'
import { classNames, IndexObj, privateRoutes } from 'utils/static';
import { useAuthContext } from 'utils/context/auth.context';
import { useMediaQuery } from 'react-responsive';


export const NavLinks = ({setSidebarOpen}:any) => {
    const [currentNavigation, setCurrentNavigation] = useState<any>(privateRoutes[0]);
    // const dashboardRoute = useSelector((state:any)=>state.dashboardReducer)
    const monitor = useMediaQuery({ minWidth: 1224 })
    const {operator} = useAuthContext()

    // useEffect(()=>{
    //     //@ts-ignore
    //     setCurrentNavigation(privateRoutes[IndexObj[dashboardRoute.href]])
    // },[dashboardRoute])

    const handleNavigationChange = (nav: any) => {
        // !monitor && setSidebarOpen(false)
        // setCurrentNavigation(nav);
    };

    return <nav className="">
        {privateRoutes.map((item) => (
            <>{
                !item?.allowedRoles?.includes(operator?.managerRole.toLowerCase()) ? null :
                <a key={item.name} href='#' onClick={() => handleNavigationChange(item)}
                    className={classNames(
                    item.name === currentNavigation.name
                        ? "bg-white text-gray-400 border-0 my-6"
                        : "text-white hover:bg-white hover:text-gray-600 hover:bg-opacity-75",
                    "group flex items-center px-6 py-2 text-sm font-medium rounded-l-md my-6"
                    )}>
                    <item.icon
                    className="mr-3 flex-shrink-0 h-6 w-6 text-gray-500"
                    aria-hidden="true"
                    />
                    
                    {item.name}
                </a>
              }
            </>
        ))}
    </nav>
}


