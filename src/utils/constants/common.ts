import { BeakerIcon, ClipboardDocumentListIcon, HomeIcon, UserCircleIcon, WrenchScrewdriverIcon } from "@heroicons/react/20/solid";

export const privateRoutes: any[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: HomeIcon,
      current: true,
      allowedRoles: ["admin", "operator", "owner", "spoc", "manager"],
    },
    {
      name: "Tests Offered",
      href: "/test",
      icon: BeakerIcon,
      current: false,
      allowedRoles: ["admin", "operator", "owner", "spoc", "manager"],
    },
    {
      name: "View Reports",
      href: "/reports",
      icon: ClipboardDocumentListIcon,
      current: false,
      allowedRoles: ["admin", "operator", "owner", "spoc", "manager"],
    },
    {
      name: "Profile",
      href: "/profile",
      icon: UserCircleIcon,
      current: false,
      allowedRoles: ["admin", "operator", "owner", "spoc", "manager"],
    },
    {
      name: "Settings",
      href: "/settings",
      icon: WrenchScrewdriverIcon,
      current: false,
      allowedRoles: ["owner", "admin"],
    },
  ];
  
  export function classNames(...classes: (string | undefined)[]): string {
    return classes.filter(Boolean).join(" ");
  }