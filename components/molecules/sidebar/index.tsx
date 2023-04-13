
import { DashboardLogo } from '@components/atoms/nav/logo';
import { NavLinks } from '@components/atoms/nav/links';

import React from 'react'

export function Sidebar({setSidebarOpen}:any) {
	return (
        <div className={`w-64 `}>
          <div className="md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            <div className="flex-1 flex flex-col h-[100vh] bg-orange-400">
              <DashboardLogo/>
              <NavLinks setSidebarOpen={setSidebarOpen}/>
              <p className='text-sm text-center px-2 text-green-900 font-semi-bold absolute bottom-10'>Copyright  
              <a href='https://omerald.com/' target={"_blank"} > @Omerald </a> 2023. All Rights Reserved.</p>
            </div>
          </div>
        </div>
	)
}

