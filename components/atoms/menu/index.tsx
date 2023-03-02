import { Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthContext } from 'utils/context/auth.context'
import { classNames } from 'utils/static'
import { SET_DASHBOARD_ROUTE } from 'utils/store/types'

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
 ]
export const MenuDropDown = () => {
    
    const {diagnosticDetails,signOut} = useAuthContext()
    const dispatch = useDispatch()
    const router = useRouter()

    const handleLogout=()=>{
        signOut()
    }
  return (
    <div>
        {/* Profile dropdown */}
        <Menu as="div" className="relative ml-3">
                        <div>
                            <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span className="sr-only">Open user menu</span>
                          
                            <img
                                className="h-8 w-8 rounded-full border-2 border-gray-400"
                                //@ts-ignore
                                src={diagnosticDetails?.brandDetails && diagnosticDetails?.brandDetails[0] && diagnosticDetails?.brandDetails[0]?.brandLogo ? diagnosticDetails?.brandDetails[0]?.brandLogo :"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} alt=""
                            />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                {({ active }) => (
                                    <a
                                    onClick={()=>{ 
                                        if(diagnosticDetails!=null && item.name == "Sign out"){
                                          handleLogout()
                                        }
                                        else if(diagnosticDetails!=null && item.name =="Settings"){
                                            dispatch({ type: SET_DASHBOARD_ROUTE,payload: {name:item.name,href:"/settings",loading:false} })
                                            router.push("/dashboard")
                                        }
                                        else if(diagnosticDetails!=null && item.name =="Your Profile"){
                                            dispatch({ type: SET_DASHBOARD_ROUTE,payload: {name:item.name,href:"/profile",loading:false} })
                                            router.push("/dashboard")
                                        }
                                    }}
                                    href={item.href}
                                    className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                    >
                                    {item.name}
                                    </a>
                                )}
                                </Menu.Item>
                            ))}
                            </Menu.Items>
                        </Transition>
        </Menu>
    </div>
  )
}
