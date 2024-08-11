import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Space } from "antd";

export const ADMIN_USER_ACTIVITES_COLUMNS = [
  {
    key: 'activity',
    title: 'Activity',
    dataIndex: 'activity',
    // render: (text: any) => <a className='text-blue-800 font-medium'>{text}</a>,
    // sorter: (a: any, b: any) => a.activity.length - b.activity.length,
  },
  {
    key: 'user',
    title: 'Activity By',
    dataIndex: 'user',
    // render: (text: any) => <a>{text?.name}</a>,
    // sorter: (a: any, b: any) => a.user.length - b.user.length,
  },
  {
    key: 'updatedTime',
    title: 'Activity Time',
    dataIndex: 'updatedTime',
    // render: (text: any) => <a>{moment(text).format("DD/MM/yyyy HH:mm:ss")}</a>,
  },
];

export const BRANCH_EMPLOYEE_COLUMNS =  [
  {
    title: 'Operator Name',
    dataIndex: 'userName',
    key: 'userName',  
  },
  {
    title: 'Operator Contact',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber'
  },
  {
    title: 'Operator Role',
    dataIndex: 'roleName',
    key: 'roleName',
  }
];

export const ADMIN_USER_COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'userName',
    key: 'userName',
    sorter: (a, b) => a.userName.localeCompare(b.userName),
  },
  {
    title: 'PhoneNumber',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    sorter: (a, b) => a.role.localeCompare(b.role),
    render: (role, record) => {
      return <p className="uppercase">{role}</p>;
    },
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
];
