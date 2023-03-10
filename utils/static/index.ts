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

export  const SupportForm =   [ 
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subjectsss',
    render: (text:any) => <a className='text-blue-800 font-medium'>{text}</a>,
    sorter: (a:any, b:any) => a.subject.length - b.subject.length,
  },
  {
      title: 'Query',
      dataIndex: 'message',
      key: 'messagesss',
      render: (text:any) => <a className='italic font-bold '>{text}</a>,
      sorter: (a:any, b:any) => a.message.length - b.message.length,
  },
  {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branchsss',
      render: (text:any) =><a className='text-blue-800 font-medium'>{text}</a>,
      sorter: (a:any, b:any) => a.branch.length - b.branch.length,
  },
  {
    title: 'Query Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text:any) => <a className='text-blue-800 font-medium'>{text}</a>,
    sorter: (a:any, b:any) => a.createdAt.length - b.createdAt.length,
},
] 

export const ActivityForm  = [   
  {
      key: 'sdas',
      title: 'Activity',
      dataIndex: 'activity',
      render: (text:any) => <a className='text-blue-800 font-medium'>{text}</a>,
      sorter: (a:any, b:any) => a.activity.length - b.activity.length,
    },
    {
        key: 'user',
        title: 'Activity By',
        dataIndex: 'user',
        render: (text:any) => <a>{text.managerName}</a>,
        sorter: (a:any, b:any) => a.user.length - b.user.length,
        filters: managersList,
        onFilter: (value: string, record) => record.user.managerName.indexOf(value) === 0,
    },
    {
        key: 'qws',
        title: 'Activity Time',
        dataIndex: 'updatedTime',
        render: (text:any) => <a>{moment(text).format("DD/MM/yyyy HH:mm:ss")}</a>,
        sorter: (a:any, b:any) => new Date(a.updatedTime) - new Date(b.updatedTime),
   
    },
]