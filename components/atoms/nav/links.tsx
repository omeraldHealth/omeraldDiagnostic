

import React, { useEffect, useState } from 'react'
import { classNames, privateRoutes } from 'utils/static';
import { useDispatch, useSelector } from 'react-redux';
import { SET_DASHBOARD_ROUTE } from 'utils/store/types';

const IndexObj = {
    "/dashboard":0,
    "/addReports":1,
    "/reports":2,
    "/addTest":3,
    "/test":4,
    "/profile":5,
    "/settings":6
}
  

export const NavLinks = () => {
    const [currentNavigation, setCurrentNavigation] = useState<any>(privateRoutes[0]);
    const dispatch = useDispatch()
    const dashboardRoute = useSelector((state:any)=>state.dashboardReducer)

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
            <a key={item.name} href='#' onClick={() => handleNavigationChange(item)}
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


