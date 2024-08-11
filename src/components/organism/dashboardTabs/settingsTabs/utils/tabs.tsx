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

export const BRANCH_EMPLOYEE_COLUMNS = (handleEdit:any, handleRemove: any, profile: any) => [
  {
    title: 'Operator Name',
    dataIndex: 'managerName',
    key: 'managerName',
    render: (text:any) => <a className='text-blue-800 font-medium'>{text}</a>,
    sorter: (a:any, b:any) => a.managerName.length - b.managerName.length,
  },
  {
    title: 'Operator Role',
    dataIndex: 'managerRole',
    key: 'managerRole',
    render: (text:any) => <a>{text}</a>,
    sorter: (a:any, b:any) => a.managerRole.length - b.managerRole.length,
    filters: [
      { "text": "Admin", "value": "Admin" },
      { "text": "Manager", "value": "Manager" },
      { "text": "Operator", "value": "Operator" },
      { "text": "Spoc", "value": "Spoc" },
    ],
    onFilter: (value: string, record:any) => record.managerRole.indexOf(value) === 0,
  },
  {
    title: 'Operator Contact',
    dataIndex: 'managerContact',
    key: 'managerContact',
    render: (text:any) => <a>{text}</a>,
    sorter: (a:any, b:any) => a.managerContact.length - b.managerContact.length,
  },
  {
    title: 'Action',
    dataIndex: 'managerSignature',
    key: 'managerSignature  ',
    render: (i:any, record:any, index:any) => (
      <Space size="middle">
        {(record?.managerRole !== "owner") && (
          <a>
            <PencilIcon onClick={() => handleEdit(record)} className='w-4 text-gray-900' />
          </a>
        )}
          <a>
            <TrashIcon onClick={handleRemove} className='w-4 text-red-500' />
          </a>
      </Space>
    ),
  },  
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
