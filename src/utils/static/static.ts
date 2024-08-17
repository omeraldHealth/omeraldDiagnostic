import {
  ClipboardDocumentListIcon,
  HomeIcon,
  UserCircleIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/20/solid";
import { BeakerIcon } from "@heroicons/react/24/outline";
import { OnboardStepsType } from "@utils/types/atoms/atoms";
import { BlogDataType, UserNavigationItem } from "@utils/types";

export const onboardSteps: OnboardStepsType[] = [
  { id: 1, name: "Basic Details" },
  { id: 2, name: "Branch Details" },
  { id: 3, name: "Brand Details" },
  { id: 4, name: "Summary" },
];
export const addReportSteps: OnboardStepsType[] = [
  { id: 1, name: "Enter Patient Details" },
  { id: 2, name: "Upload Report" },
  { id: 3, name: "Report Summary" },
  { id: 4, name: "Success" },
];
export const addTestSteps: OnboardStepsType[] = [
  { id: 1, name: "Enter Test Details" },
  { id: 2, name: "Enter Parameters & aliases" },
  { id: 3, name: "Success" },
];
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

export const settingsTab: string[] = [
  "Billing",
  "Activity Feed",
  "Employee Management",
  "Branch Management",
  "Pathologists",
  "Support",
];

export const advertisement: {
  title: string;
  description: string;
  button: string;
}[] = [
  {
    title: "Get Started",
    description:
      "Please login to get started with uploading and sharing your reports",
    button: "Know more",
  },
  {
    title: "Access Demo",
    description:
      "We are currently offering the service free of cost to help you",
    button: "Know more",
  },
];

export const IndexObj: Record<string, number> = {
  "/dashboard": 0,
  "/test": 1,
  "/reports": 2,
  "/profile": 3,
  "/settings": 4,
};

export const roles: string[] = ["Admin", "Manager", "Operator", "Spoc"];

export const plainOptions: string[] = ["Male", "Female", "Others"];

interface NavigationItem {
  name: string;
  href: string;
}

interface Navigation {
  support: NavigationItem[];
  company: NavigationItem[];
  legal: NavigationItem[];
  social: NavigationItem[];
}

export const navigation: Navigation = {
  legal: [
    { name: "Terms of Service", href: "/info/terms" },
    { name: "Platform Consent", href: "/info/consent" },
    { name: "Privacy Policy", href: "/info/privacy" },
    { name: "Disclaimer", href: "/info/disclaimer" },
  ],
  support: [
    { name: "FAQ", href: "/info/faq" },
    { name: "Contact", href: "/contact" },
  ],
  company: [
    { name: "Blog", href: "https:/blog.omerald.com/" },
    { name: "Register", href: "/signUp" },
    { name: "About", href: "/info/about" },
  ],
  social: [],
};

export const blogs: BlogDataType[] = [
  {
    title: "Believing neglected so so allowance existence departure.",
    description:
      "Blessing welcomed ladyship she met humoured sir breeding her. Six curiosity day assurance bed necessary.",
    url: "https://omerald-prod.s3.ap-south-1.amazonaws.com/images/Olive%20Oil%20and%20Turmeric_1654279005.webp",
    date: "08-11-2021",
  },
  {
    title:
      "In design active temper be uneasy. Thirty for remove plenty regard you.",
    description:
      "Yet preference connection unpleasant yet melancholy but end appearance. And excellence partiality estimating terminated day everything.",
    url: "https://omerald-prod.s3.ap-south-1.amazonaws.com/images/glowing%20skin2_1653733484.webp",
    date: "08-11-2021",
  },
];

export const sideBlogs: BlogDataType[] = [
  {
    title: "Believing neglected so so allowance existence departure.",
    description:
      "Blessing welcomed ladyship she met humoured sir breeding her. Six curiosity day assurance bed necessary.",
    url: "https://omerald-prod.s3.ap-south-1.amazonaws.com/images/Olive%20Oil%20and%20Turmeric_1654279005.webp",
    date: "08-11-2021",
  },
  {
    title:
      "In design active temper be uneasy. Thirty for remove plenty regard you.",
    description:
      "Yet preference connection unpleasant yet melancholy but end appearance. And excellence partiality estimating terminated day everything.",
    url: "https://omerald-prod.s3.ap-south-1.amazonaws.com/images/glowing%20skin2_1653733484.webp",
    date: "08-11-2021",
  },
  {
    title: "Believing neglected so so allowance existence departure.",
    description:
      "Blessing welcomed ladyship she met humoured sir breeding her. Six curiosity day assurance bed necessary.",
    url: "https://omerald-prod.s3.ap-south-1.amazonaws.com/images/Olive%20Oil%20and%20Turmeric_1654279005.webp",
    date: "08-11-2021",
  },
  {
    title:
      "In design active temper be uneasy. Thirty for remove plenty regard you.",
    description:
      "Yet preference connection unpleasant yet melancholy but end appearance. And excellence partiality estimating terminated day everything.",
    url: "https://omerald-prod.s3.ap-south-1.amazonaws.com/images/glowing%20skin2_1653733484.webp",
    date: "08-11-2021",
  },
];

export const userNavigation: UserNavigationItem[] = [
  { name: "Dashboard", href: "#" },
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

export function formatTimeFromDate(date: Date): string {
  const dates = new Date(date);
  const month = (dates.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = dates.getDate().toString().padStart(2, "0");
  const year = dates.getFullYear();

  return `${month}/${day}/${year}`;
}
