import { successAlert } from '@components/atoms/alerts/alert'
import { Spinner } from '@components/atoms/loader'
import { MenuDropDown } from '@components/atoms/menu'
import { Menu, Transition } from '@headlessui/react'
import { Bars3BottomLeftIcon, Bars3Icon, BellIcon } from '@heroicons/react/20/solid'
import { getDiagnosticUserApi } from '@utils'
import { Select, Spin } from 'antd'
import { useRouter } from 'next/router'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAuthContext } from 'utils/context/auth.context'
import { useQueryGetData, useUpdateDiagnostic } from 'utils/reactQuery'
import { Sidebar } from '../sidebar'
import { useMediaQuery } from 'react-responsive'


export function DashboardHeader({showSidebar,setSidebarOpen}:any) {
  
    const dashboardRoute = useSelector((state:any)=>state.dashboardReducer)
    const {diagnosticDetails,operator,activeBranch,setActiveBranch} = useAuthContext();
    const {data:diagnostic}  = useQueryGetData("getDiagnostic",getDiagnosticUserApi+diagnosticDetails?.phoneNumber)
    const router = useRouter()
    const [selectedBranch,setSelectedBranch] = useState(null)
    const [branchList,setBrancList] = useState(null)
    const monitor = useMediaQuery({ minWidth: 1224 })
    const mobile = useMediaQuery({ maxWidth: 400 })
    let [loading,setLoading] = useState(false)

    const updateDiagnostic = useUpdateDiagnostic({
        onSuccess: (data) => {

        },
        onError: (error) => {
          successAlert("Error updating branch")
        },
    });

    useEffect(()=>{
        if(activeBranch){
            setSelectedBranch(activeBranch)
        }
    },[activeBranch])

    const handleProvinceChange = (e:any) =>{
        setLoading(true)
        setTimeout(()=>{ 
            successAlert("Branch switched sucessfully")
            setLoading(false)
        },1000)
        let branchListTmp = diagnostic?.data?.branchDetails.filter((branch:any) => branch?._id === e)
        setSelectedBranch(branchListTmp?.[0])
        setActiveBranch(branchListTmp?.[0])
    }

    useEffect(()=>{
        let branches = diagnostic?.data?.branchDetails.filter((branch:any)=> {return  branch?.branchContact === diagnosticDetails?.phoneNumber || branch?.branchOperator?.includes(operator?.managerContact)})
        setBrancList(branches)
    },[diagnostic   ])

	return (
        <div className={`flex justify-between items-center`}>
            <div className="flex flex-1 flex-col">
                <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
                    <div className="flex flex-1 justify-between px-4">
                    <div className="flex flex-1">
                       <p className='flex sm:font-bold text-md sm:text-lg self-center'><Bars3Icon  onClick={() => !monitor && setSidebarOpen(!showSidebar)} className='w-6 mr-1 sm:mx-4'/>{dashboardRoute?.name}</p>
                    </div>
                    <div className="ml-4 flex items-center lg:ml-6">
                        <section className='flex gap-1'>
                        <Select
                                placeholder="Select Branch"
                                value={{ label: selectedBranch?.branchName, value: selectedBranch }}
                                style={mobile ? { width: 130,marginLeft:0 }:{ width: 160,marginLeft:10 } }
                                onChange={handleProvinceChange}
                                options={branchList?.map((branch:any) => ({ label: branch?.branchName, value: branch?._id }))}
                        />
                        <MenuDropDown/>
                        </section>
                    </div>
                    </div>
                </div>
            </div>          
            {loading && <Spinner/>}
        </div>
        
	)
}

