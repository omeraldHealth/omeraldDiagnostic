import { ChartBarSquareIcon, ClipboardDocumentListIcon, HomeIcon, UserCircleIcon, WrenchScrewdriverIcon } from '@heroicons/react/20/solid'
import { BeakerIcon} from '@heroicons/react/24/outline'
import { SVGProps } from 'react';

export const onboardSteps = [
    { id: 1, name: "Basic Details" },
    { id: 2, name: "Brand Details" },
    { id: 3, name: "Report Details" },
    { id: 4, name: "Summary" },
];

export type onboardStepsType = {
    id: number;
    name: string;
}

export const privateRoutes = [
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

export function classNames(...classes: [string, string]) {
    return classes.filter(Boolean).join(" ");
}

export type NavigationType = {
    name: string;
    href: string;
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    current: boolean;
};
