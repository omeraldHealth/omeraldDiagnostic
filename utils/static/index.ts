import {ClipboardDocumentListIcon, HomeIcon, UserCircleIcon, WrenchScrewdriverIcon } from '@heroicons/react/20/solid'
import { BeakerIcon} from '@heroicons/react/24/outline'
import { OnboardStepsType } from 'utils/types/atoms/atoms';

export const onboardSteps: OnboardStepsType[] = [
    { id: 1, name: "Basic Details" },
    { id: 2, name: "Brand Details" },
    { id: 3, name: "Branch Details" },
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
  { id: 2, name: "Enter Keywords & aliases" },
  { id: 3, name: "Success" },
];
export const privateRoutes: OnboardStepsType[] = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
    {
      name: "Tests Offered",
      href: "/test",
      icon: BeakerIcon,
      current: false,
    },
    {
      name: "View Reports",
      href: "/reports",
      icon: ClipboardDocumentListIcon,
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
export const settingsTab = ["Billing","Activity Feed","Employee Management","Branch Management","Pathologists","Support"]
export const advertisement = [
  {
      "title":"Get Started",
      "description":"Please login to get started with uploading and sharing your reports",
      "button": "Know more"

  },
  {
      "title":"Access Demo",
      "description":"We are currently offering the service free of cost to help you",
      "button":"Know more"

  },
  {
      "title":"Check Offer",
      "description":"We are currently offering the service free of cost to help you.",
      "button":"Know more"
  }
]
