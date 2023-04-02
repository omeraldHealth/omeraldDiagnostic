import {ClipboardDocumentListIcon, HomeIcon, UserCircleIcon, WrenchScrewdriverIcon } from '@heroicons/react/20/solid'
import { BeakerIcon} from '@heroicons/react/24/outline'
import { OnboardStepsType } from 'utils/types/atoms/atoms';
import { FormType } from 'utils/types/molecules/forms.interface';

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
export const privateRoutes: any[] = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true,  allowedRoles: ["admin", "operator","owner","spoc","manager"] },
    {
      name: "Tests Offered",
      href: "/test",
      icon: BeakerIcon,
      current: false,
      allowedRoles: ["admin", "operator","owner","spoc","manager"]
    },
    {
      name: "View Reports",
      href: "/reports",
      icon: ClipboardDocumentListIcon,
      current: false,
      allowedRoles: ["admin", "operator","owner","spoc","manager"]
    },
    {
      name: "Profile",
      href: "/profile",
      icon: UserCircleIcon,
      current: false,
      allowedRoles: ["admin", "operator","owner","spoc","manager"]
    },
    {
      name: "Settings",
      href: "/settings",
      icon: WrenchScrewdriverIcon,
      current: false,
      allowedRoles: ["owner","admin"]
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
export const IndexObj = {
  "/dashboard":0,
  "/test":1,
  "/reports":2,
  "/profile":3,
  "/settings":4
}
export const roles = ['Admin', 'Manager','Operator','Spoc'];
export const plainOptions = ['Male', 'Female', 'Others'];

export const navigation = {
  policies: [
    { name: "Disclaimer", href: "/info/disclaimer" },
    { name: "Privacy Policy", href: "/info/privacy" },
    { name: "Terms of Service", href: "/info/terms" },
    { name: "Platform Consent", href: "/info/consent" },
  ],
  support: [
    { name: "FAQ", href: "/faq" },
    { name: "Pricing", href: "/pricingTab" },
    { name: "Support", href: "/info/support" },
    { name: "Documentation", href: "/info/documentation" },
  ],
  company: [
    { name: "Blog", href: "https:/blog.omerald.com/" },
    { name: "Register", href: "/signin" },
    { name: "About", href: "/about" },
    { name: "Partners", href: "/info/team" },
  ],
  legal: [
    { name: "Terms", href: "/info/terms" },
    // { name: "Claim", href: "/privacy" },
  ],
  social: [
   
  ],
};