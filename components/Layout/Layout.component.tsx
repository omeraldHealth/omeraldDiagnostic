import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { classNames } from "@/utils/helper";
import { LayoutProps, NavigationType } from "./Layout.interface";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "../core/Button/Button.component";
import { useAuth } from "../../lib/auth";
import {
  Bars3Icon,
  ClipboardDocumentListIcon,
  HomeIcon,
  XMarkIcon,
  ChartBarSquareIcon,
  BeakerIcon,
  UserCircleIcon,
  WrenchScrewdriverIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  BellIcon,
  BellAlertIcon,
  

} from "@heroicons/react/20/solid";

const privateRoutes = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  {
    name: "Add Reports",
    href: "/addReports",
    icon: ChartBarSquareIcon,
    current: false,
  },
  {
    name: "View Reports",
    href: "/reports",
    icon: ClipboardDocumentListIcon,
    current: false,
  },
  {
    name: "Tests Offered",
    href: "/test",
    icon: BeakerIcon,
    current: false,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: UserCircleIcon,
    current: false,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: WrenchScrewdriverIcon,
    current: false,
  },
];

const publicRoutes = ["/onboard", "/", "/login"];

const Layout = ({ children }: LayoutProps) => {
  const {diagnosticDetails, signOut } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentNavigation, setCurrentNavigation] = useState<NavigationType>(
    privateRoutes[0]
  );

  useEffect(() => {
    setCurrentNavigation(
      privateRoutes.find((val) => val.href === router.pathname) ||
        privateRoutes[0]
    );
  }, [router.pathname]);

  const handleNavigationChange = (nav: NavigationType) => {
    setCurrentNavigation(nav);
  };
  const handleSignOut = async () => {
    await signOut();
  };

  if (
    publicRoutes.includes(router.pathname) ||
    privateRoutes.find((val) => val.href === router.pathname) === undefined
  ) {
    return <>{children}</>;
  } else {
    return (
      <div >
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-primary">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                    <div className="flex-shrink-0 flex items-center px-4">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="/icons/onlyOmeraldLogo.png"
                        alt="Omerald"
                      />
                      <span className="text-white font-semibold text-2xl ml-4 tracking-wider">
                        Omerald
                      </span>
                    </div>
                    <nav className="mt-20 px-2 space-y-4">
                      {privateRoutes.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <a
                            onClick={() => handleNavigationChange(item)}
                            className={classNames(
                              item.name === currentNavigation.name
                                ? "bg-secondary text-white"
                                : "text-white hover:bg-btnPrimary-300  hover:bg-opacity-75",
                              "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                            )}
                          >
                            <item.icon
                              className="mr-4 flex-shrink-0 h-6 w-6 text-white"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </nav>
                  </div>
                  {/* <Button name="Sign Out" onClick={handleSignOut} /> */}
                  <div className="flex-shrink-0 flex border-t  p-4">
                    <Link href="#">
                      <a className="flex-shrink-0 group block">
                        <div className="flex items-center">
                          <div>
                            <img
                              className="inline-block w-10"
                              src={diagnosticDetails?.brandDetails.brandLogo}
                              alt=""
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-lg  font-bold text-white">
                              {diagnosticDetails?.fullName}
                            </p>
                            <button
                              onClick={handleSignOut}
                              className="text-sm font-medium text-btnPrimary-300 group-hover:text-white"
                            >
                              Sign Out
                            </button>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 bg-orangeBg">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <Link href="/" >
              <div className="flex items-center flex-shrink-0 px-4">
                <img
                  className="h-10 w-10 rounded-full"
                  src="/icons/onlyOmeraldLogo.png"
                  alt="Workflow"
                />
                <span className="text-white font-semibold text-2xl ml-4 tracking-wider">
                  Omerald
                </span>
              </div>
              </Link>
             
              <nav className="mt-16 flex-1 pl-2 space-y-6">
                {privateRoutes.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      onClick={() => handleNavigationChange(item)}
                      className={classNames(
                        item.name === currentNavigation.name
                          ? "bg-white text-gray-400 border-0"
                          : "text-white hover:bg-btnPrimary-300 hover:bg-opacity-75",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-l-md"
                      )}
                    >
                      <item.icon
                        className="mr-3 flex-shrink-0 h-6 w-6 text-gray-500"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </Link>
                ))}
              </nav>
            </div>
            {/* <Button name="Sign Out" onClick={handleSignOut} /> */}
            <div className="flex-shrink-0 flex border-t  p-4">
              <Link href="#">
                <a className="flex-shrink-0 w-full group block">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block w-10"
                        src={diagnosticDetails?.brandDetails.brandLogo ? diagnosticDetails?.brandDetails.brandLogo: "https://res.cloudinary.com/drjut62wv/image/upload/v1673515394/omerald/diagnosticCenter/doctor_fhroz3.png"}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">
                        {diagnosticDetails?.fullName}
                      </p>
                      <button
                        onClick={handleSignOut}
                        className="text-xs font-medium text-btnPrimary-500 group-hover:text-white"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1 ">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="">
              <div className="max-w-[100%] px-8 bg-white h-[7vh] py-4 flex justify-between">
                  <section className="flex">
                        <AdjustmentsHorizontalIcon className="w-6"/>
                        <p className="mx-4 flex align- font-semibold">{currentNavigation.name}</p>
                  </section>
                  {/* <section className="flex w-[20vw] bg-gray-200 rounded-xl justify-between">
                        <input className="bg-gray-200 px-10 rounded-xl border-0 outline-none font-light" placeholder="Search" />
                        <a href="/" className="w-4 mx-2 flex align-middle"><MagnifyingGlassIcon /></a> 
                  </section> */}
                  <section className="flex">
                    <BellIcon className="w-8 text-gray-600 mx-4"/>
                    <section>
                      <a href="/">
                          <img
                            className="inline-block w-8"
                            src={diagnosticDetails?.brandDetails.brandLogo ? diagnosticDetails?.brandDetails.brandLogo: "https://res.cloudinary.com/drjut62wv/image/upload/v1673515394/omerald/diagnosticCenter/doctor_fhroz3.png"}
                            alt=""
                          />
                      </a>
                    </section>
                  </section>
              </div>
              <div className="bg-[#e9e9e9] max-h-auto min-h-[93vh]">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
};

export default Layout;
