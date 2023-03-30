import { MenuDropDown } from '@components/atoms/menu'
import { Menu, Transition } from '@headlessui/react'
import { Bars3BottomLeftIcon, Bars3Icon, BellIcon } from '@heroicons/react/20/solid'

import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'




export function DashboardHeader() {

    const dispatch = useDispatch()

    const diagnosticProfile = useSelector((state:any)=>state.diagnosticReducer)
    const dashboardRoute = useSelector((state:any)=>state.dashboardReducer)

	return (
        <div className={`flex justify-between items-center`}>
             <div className="flex flex-1 flex-col">
                <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
                    {/* <button
                    type="button"
                    className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                    //   onClick={() => setSidebarOpen(true)}
                    >
                    <span className="sr-only">Open sidebar</span>
                    <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
                    </button> */}
                    <div className="flex flex-1 justify-between px-4">
                    <div className="flex flex-1">
                       <p className='flex font-bold text-lg self-center'><Bars3Icon className='w-6 mx-4'/>{dashboardRoute?.name}</p>
                    </div>
                    <div className="ml-4 flex items-center lg:ml-6">
                        <button
                        type="button"
                        className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <MenuDropDown/>
                    </div>
                    </div>
                </div>
            </div>
        </div>
	)
}

