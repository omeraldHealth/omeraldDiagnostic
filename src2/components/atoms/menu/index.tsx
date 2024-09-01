import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import { useAuthContext } from '@utils/context/auth.context';
import { classNames, userNavigation } from '@utils/static/static';

interface MenuDropDownProps {}

export const MenuDropDown: React.FC<MenuDropDownProps> = () => {
  const { signOut } = useAuthContext();
  const { diagnosticDetails } = useAuthContext();
  const router = useRouter();
  const logo =
    diagnosticDetails?.brandDetails?.brandLogo ||
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

  const handleMenuClick = (item: string) => {
    if (diagnosticDetails !== null) {
      switch (item) {
        case 'Sign out':
          handleLogout();
          break;
        case 'Dashboard':
        case 'Settings':
        case 'Your Profile':
          router.push('/dashboard');
          break;
        // Add more cases as needed
        default:
          break;
      }
    }
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <div>
      {/* Profile dropdown */}
      <Menu as="div" className="relative ml-2">
        <div>
          <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span className="sr-only">Open user menu</span>
            <img
              className="h-8 w-8 rounded-full border-2 border-gray-400"
              src={logo}
              alt=""
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
                    onClick={() => handleMenuClick(item.name)}
                    href={item.href}
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
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
  );
};
