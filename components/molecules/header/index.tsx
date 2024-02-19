import { successAlert } from '@components/atoms/alerts/alert'
import { Spinner } from '@components/atoms/loader'
import { MenuDropDown } from '@components/atoms/menu'
import { Menu, Transition } from '@headlessui/react'
import { Bars3BottomLeftIcon, Bars3Icon, BellIcon } from '@heroicons/react/20/solid'
import { Select, Spin } from 'antd'
import { useRouter } from 'next/router'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAuthContext } from 'utils/context/auth.context'
import { useQueryGetData, useUpdateDiagnostic } from 'utils/reactQuery'
import { Sidebar } from '../sidebar/sidebar'
import { useMediaQuery } from 'react-responsive'
import { getDiagProfileByPhoneApi } from '../../../utils'
import { useRecoilValue } from 'recoil'
import { profileState } from '../../common/recoil/profile'
import { dashTabs } from '../../common/recoil/dashboard'
import { branchState } from '../../common/recoil/blogs/branch'
import { useUser } from '@clerk/clerk-react'
import { useCurrentBranchValue, useManagerValue, useProfileValue } from '@components/common/constants/constants'
import { operatorState } from '@components/common/recoil/operator'


export function DashboardHeader({showSidebar,setSidebarOpen}:any) {
  
    const profile = useProfileValue()
    const {user} = useUser();
    const [branchList,setBranchList] = useState(null)
    const monitor = useMediaQuery({ minWidth: 1224 })
    const mobile = useMediaQuery({ maxWidth: 400 })
    const tabName = useRecoilValue(dashTabs)
    const currentBranch = useCurrentBranchValue()
    const currentManager = useManagerValue()
    const phoneNumber = user && user?.phoneNumbers[0]?.phoneNumber;

    useEffect(()=>{
        //@ts-ignore
        let branches = profile?.branchDetails?.filter((branch:any)=> {return  branch?.branchContact === phoneNumber || branch?.branchOperator?.includes(currentManager.branchContact)})
        setBranchList(branches)
    },[profile ])

	return (
        // <div className={`flex justify-between items-center`}>
        //     <div className="flex flex-1 flex-col">
        //         <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
        //             <div className="flex flex-1 justify-between px-4">
        //             <div className="flex flex-1">
        //                <p className='flex sm:font-bold text-md sm:text-lg self-center'><Bars3Icon  onClick={() => !monitor && setSidebarOpen(!showSidebar)} className='w-6 mr-1 sm:mx-4'/>{tabName}</p>
        //             </div>
        //             <div className="ml-4 flex items-center lg:ml-6">
        //                 <section className='flex gap-1'>
        //                 <Select
        //                         placeholder="Select Branch"
        //                         value={{ label: currentBranch?.branchName, value: currentBranch }}
        //                         style={mobile ? { width: 130,marginLeft:0 }:{ width: 160,marginLeft:10 } }
        //                         // onChange={handleProvinceChange}
        //                         options={branchList?.map((branch:any) => ({ label: branch?.branchName, value: branch?._id }))}
        //                 />
        //                 {/* <MenuDropDown/> */}
        //                 </section>
        //             </div>
        //             </div>
        //         </div>
        //     </div>          
        // </div>
        <></>
	)
}

