

import React, { useEffect, useState } from 'react'
import { classNames, IndexObj, privateRoutes } from 'utils/static';
import { useDispatch, useSelector } from 'react-redux';
import { SET_DASHBOARD_ROUTE } from 'utils/store/types';
import { useAuthContext } from 'utils/context/auth.context';


export const NavLinks = () => {
    const [currentNavigation, setCurrentNavigation] = useState<any>(privateRoutes[0]);
    const dispatch = useDispatch()
    const dashboardRoute = useSelector((state:any)=>state.dashboardReducer)

    const {operator} = useAuthContext()

    useEffect(()=>{
        //@ts-ignore
        setCurrentNavigation(privateRoutes[IndexObj[dashboardRoute.href]])
    },[dashboardRoute])

    const handleNavigationChange = (nav: any) => {
        setCurrentNavigation(nav);
        dispatch({ type: SET_DASHBOARD_ROUTE,payload: {name:nav.name,href:nav.href,loading:true} });
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


