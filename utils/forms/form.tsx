import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Modal, Space, Tag } from "antd";
import moment from "moment";

const { confirm } = Modal;

export const ActivityColumns = [
  {
    key: 'sdas',
    title: 'Activity',
    dataIndex: 'activity',
    render: (text: any) => <a className='text-blue-800 font-medium'>{text}</a>,
    sorter: (a: any, b: any) => a.activity.length - b.activity.length,
  },
  {
    key: 'user',
    title: 'Activity By',
    dataIndex: 'user',
    render: (text: any) => <a>{text?.managerName}</a>,
    sorter: (a: any, b: any) => a.user.length - b.user.length,
  },
  {
    key: 'updatedTime',
    title: 'Activity Time',
    dataIndex: 'updatedTime',
    render: (text: any) => <a>{moment(text).format("DD/MM/yyyy HH:mm:ss")}</a>,
    sorter: (a: any, b: any) => new Date(a?.updatedTime) - new Date(b?.updatedTime),
  },
];

export const PathologistColumns = (handleEdit: any, handleRemove: any) => [
  {
    title: 'Pathologist Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: any) => <a className='text-blue-800 font-medium'>{text}</a>,
    sorter: (a: any, b: any) => a.name.length - b.name.length,
  },
  {
    title: 'Pathologist Designation',
    dataIndex: 'designation',
    key: 'designation',
    render: (text: any) => <a>{text}</a>,
    sorter: (a: any, b: any) => a.designation.length - b.designation.length,
    // filters: pathList,
    // onFilter: (value: string, record) => record.designation.indexOf(value) === 0,
  },
  {
    title: 'Pathologist Signature',
    dataIndex: 'signature',
    key: 'signature',
    sorter: (a: any, b: any) => a.signature.length - b.signature.length,
    render: (text: any) => (
      <span>
        {text ? <img src={text} className="w-[100px] h-[30px]" /> : <p className="font-light text-sm text-red-600">Not found</p>}
      </span>
    ),
  },
  {
    title: 'Action',
    dataIndex: 'name',
    key: 'name  ',
    render: (text: any, record: any) => (
      <Space size="middle">
        <a>
          <TrashIcon className='w-4 text-red-500' onClick={() => {
            confirm({
              title: 'Do you want to delete this pathologist?',
              content: 'The action cannot be undone.',
              onOk() {
                handleRemove("pathologistDetail",record);
              },
            });
          }} />
        </a>
        <a>
          <PencilIcon onClick={() => { handleEdit(record) }} className='w-4 text-gray-900' />
        </a>
      </Space>
    ),
  },
];

export const BranchColumns = (handleEdit: any, handleRemove: any, profile: any) => [
  {
    title: 'Branch Name',
    dataIndex: 'branchName',
    key: 'branchName',
    render: (text: any) => <a className='text-blue-800 font-medium'>{text}</a>,
    sorter: (a: any, b: any) => a.branchName.length - b.branchName.length,
    // filters: branchList,
    // onFilter: (value: string, record) => record?.branchName?.indexOf(value) === 0,
  },
  {
    title: 'Branch Email',
    dataIndex: 'branchEmail',
    key: 'branchEmail',
    render: (text: any) => <a>{text}</a>,
    sorter: (a: any, b: any) => a.branchEmail.length - b.branchEmail.length,
  },
  {
    title: 'Branch Contact',
    dataIndex: 'branchContact',
    key: 'branchContact',
    render: (text: any) => <a>{text}</a>,
    sorter: (a: any, b: any) => a.branchContact.length - b.branchContact.length,
  },
  {
    title: 'Branch Address',
    dataIndex: 'branchAddress',
    key: 'branchAddress',
    render: (text: any) => <a>{text}</a>,
    sorter: (a: any, b: any) => a.branchAddress.length - b.branchAddress.length,
  },
  // {
  //   title: 'Branch Operator',
  //   dataIndex: 'branchOperator',
  //   key: 'branchOperator',
  //   render: (text: any) => {
  //     getOperator(""); // Call your function here
  //     const operatorTags = text?.map((tag: any) => <Tag color="green" key={tag}>{tag}</Tag>); // Assuming getOperator returns tag directly
  //     return operatorTags;
  //   },
  //   // sorter: (a:any, b:any) => a.branchAddress.length - b.branchAddress.length,
  // },
  {
    title: 'Action',
    dataIndex: 'branchAddress',
    key: 'branchAddress  ',
    render: (_, record: any, index: any) => (
      <Space size="middle">
        {(record?.branchContact !== profile?.phoneNumber) ? 
          <a>
            <PencilIcon onClick={() => { handleEdit(record) }} className='w-4 text-gray-900' />
          </a>:
          <p className="text-sm font-bold italic text-red-500">Current Profile</p>
        }
        {(record?.branchContact !== profile?.phoneNumber) && (
          <a>
            <TrashIcon className='w-4 text-red-500' onClick={() => {
              confirm({
                title: 'Do you want to delete this branch?',
                content: 'The action cannot be undone.',
                onOk() {
                  handleRemove("branchDetails",record)
                },
              })
            }} />
          </a>
        )} 
      </Space>
    ),
  },
];


export const EmployeeColumns = (handleEdit:any, handleRemove: any, profile: any) => [
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
        {(record?.managerRole !== "owner") && (
          <a>
            <TrashIcon onClick={() => {
              confirm({
                title: 'Do you want to delete this employee?',
                content: 'The action cannot be undone.',
                onOk() {
                  handleRemove("managersDetail", record);
                },
              });
            }} className='w-4 text-red-500' />
          </a>
        )}
      </Space>
    ),
  },
];
