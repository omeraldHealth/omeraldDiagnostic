
import { DashboardLogo } from '@components/atoms/logo';
import { NavLinks } from '@components/atoms/nav/links';

import React from 'react'

export function Sidebar() {
	return (
        <div className={`w-64`}>
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div className="flex-1 flex flex-col min-h-0 bg-orangeBg">
            <DashboardLogo/>
            <NavLinks/>
          </div>
        </div>
        </div>
	)
}

