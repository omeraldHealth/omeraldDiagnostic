import { EyeIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Image, Modal, Popover, Space, Tag } from "antd";
import moment from "moment";
import dayjs from "dayjs"

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
      <span className="w-[20px] h-[20px]">
        {text ? (
           <span className="object-cover border rounded">  <Image width={100} src={text} /></span>
          ) : (
            <p className="font-light text-sm text-red-600">Not found</p>
          )}
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
        {/* <a>
          <PencilIcon onClick={() => { handleEdit(record) }} className='w-4 text-gray-900' />
        </a> */}
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
        {/* {(record?.branchContact !== profile?.phoneNumber) ? 
          <a>
            <PencilIcon onClick={() => { handleEdit(record) }} className='w-4 text-gray-900' />
          </a>:
          <p className="text-sm font-bold italic text-red-500">Current Profile</p>
        } */}
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
        {/* {(record?.managerRole !== "owner") && (
          <a>
            <PencilIcon onClick={() => handleEdit(record)} className='w-4 text-gray-900' />
          </a>
        )} */}
        {(record?.managerRole !== "owner" &&   record?.managerContact !== profile?.phoneNumber) && (
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

interface TestTableColumn {
  key: string;
  title: string;
  dataIndex: string;
  render?: (text: any, record: any) => React.ReactNode;
  sorter?: (a: any, b: any) => number;
}

const getPopOver = (param:any) => {
  console.log(param)
  return <div className="max-w-[5vw]">
    <p><strong>Name</strong>: {param?.name}</p>
    <p style={{ width: 300,  wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}  className="w-10 overflow-hidden whitespace-nowrap">{param?.description}</p>

    <p><strong>Aliases</strong>: {param?.aliases.join(",")}</p>
    <p><strong>IsActive</strong>: {param?.isActive}</p>
    <p><strong>BioRefRange</strong>: 
      <br/>
      <span>
        {
          param?.bioRefRange.basicRange.map((basic:any) => {return <span>Basic: unit: {basic.unit}, min: {basic.min}, max: {basic.max}</span>})
        }
      </span>
    </p>
    {/* <p>BioRefRange: </p> */}
  </div>
}

export const TestTableColumns: (handleEdit: any, handleRemove: any, profile: any) => TestTableColumn[] = (
  handleEdit,
  handleRemove,
) => [
  {
    key: 'testName',
    title: 'Test Name',
    dataIndex: 'testName',
    render: (text: any) => <a>{text}</a>,
    sorter: (a: any, b: any) => a.sampleType.testName.length - b.sampleType.testName.length,
  },
  {
    key: 'parameter',
    title: 'Parameters',
    dataIndex: 'parameter',
    render: (parameters: any, record: any) => (
      <>
      {console.log(parameters)}
        {parameters?.map((param: any, index: any) => (
          <a  key={index} href='#'>
            <Popover content={getPopOver(param)} title={"Parameter Aliases"}>
              <Tag className='my-1' color='green' key={param}>
                {param?.name}
              </Tag>  
            </Popover>
          </a>
        ))}
      </>
    ),
  },
  {
    key: 'isActive',
    title: 'Status',
    dataIndex: 'isActive',
    sorter: (a: any, b: any) => a.sampleType.keywords.length - b.sampleType.keywords.length,
    render : (text: any ) => {
      if(text){
        return <Tag color="green">Active</Tag>
      }else{
        return <Tag color="red">Inactive</Tag>
      }
    }
  },
  {
    key: 'action',
    title: 'Action',
    dataIndex: 'action',
    render: (text: any, record: any) => (
      <Space size='middle'>
        <a>
          <TrashIcon className='w-4 text-red-500' onClick={() => handleRemove(record)} />
        </a>
        {/* <a>
          <PencilIcon onClick={() => handleEdit(record)} className='w-4 text-gray-900' />
        </a> */}
      </Space>
    ),
  },
];

export const ParameterColumns =  
  [
    {
      key: "keyword",
      title: "Parameter",
      dataIndex: "keyword",
      render: (text:any) => <a className="text-blue-800 font-medium">{text}</a>,
      sorter: (a:any, b:any) => a.keyword.length - b.keyword.length,
    },
    {
      key: "minRange",
      title: "Min Range",
      dataIndex: "minRange",
      render: (text:any)  => <a>{text}</a>,
      sorter: (a:any, b:any) => a.minRange.length - b.minRange.length,
    },
    {
      key: "maxRange",
      title: "Max Range",
      dataIndex: "maxRange",
      render: (text:any)  => <a>{text}</a>,
      sorter: (a:any, b:any) => a.maxRange.length - b.maxRange.length,
    },
    {
      key: "unit",
      title: "Unit",
      dataIndex: "unit",
      sorter: (a:any, b:any) => a.unit.length - b.unit.length,
      render: (text:any)  => <a>{text}</a>,
    },
    {
      key: 'aliases',
      title: 'Aliases',
      dataIndex: 'aliases',
      sorter: (a:any, b:any) => a.aliases.length - b.aliases.length,
      render: (tags: any) => {
        if (!tags || tags?.length < 1) {
          return null; // Return null instead of an empty <p></p>
        }
  
        const displayTags = tags.slice(0, 6);
        const remainingTags = tags.slice(6);
  
        return (
          <>
            {displayTags.length > 0 && (
              <>
                {displayTags.map((tag) => (
                  <Tag color={'green'} key={tag}>
                    {tag}
                  </Tag>
                ))}
                {remainingTags.length > 0 && (
                  <>
                    <Tag color={'green'}>...</Tag>
                    <Tag color={'green'}>{remainingTags.length} more</Tag>
                  </>
                )}
              </>
            )}
          </>
        );
      },
    },
]

export const ReportTableColumns : (handleRemove: any) => TestTableColumn[] = (  
  handleRemove,
) => [
      {
        key:"reportId",
        title: 'Report Id',
        dataIndex: 'reportId',
        sorter: (a, b) => a.reportId.length - b.reportId.length,
        // sortDirections: ['descend'],
      },
      {
        key:"name",
        title: 'Patient Name',
        dataIndex: 'userName',
        sorter: (a, b) => a.userName.length - b.userName.length,
        // sortDirections: ['descend'],
      },
      {
        key:"email",
        title: 'Email',
        dataIndex: 'email',
        // defaultSortOrder: 'descend',
        sorter: (a, b) => a.email - b.email,
      },
      {
        key:"userId",
        title: 'Contact',
        dataIndex: 'userId',
        // defaultSortOrder: 'descend',
        sorter: (a, b) => a.userId - b.userId,
      },
      {
        key:"testName",
        title: 'Sample Type',
        dataIndex: 'testName',
        sorter: (a, b) => a.testName.length - b.testName.length,
      },
      {
        key:"reportDate",
        title: 'Report Date',
        dataIndex: 'reportDate',
        render: ((date:string) => dayjs(date).format("MMM D, YYYY") ),
        // sorter: (a, b) => new Date(a.reportDate).getTime() - new Date(b.reportDate).getTime(),
        defaultSortOrder: ['ascend']
      },
      // {
      //   key:"updatedAt",
      //   title: 'Uploaded Date',
      //   dataIndex: 'updatedAt',
      //   render: ((date:string) => dayjs(date).format("MMM D, YYYY") ),
      //   sorter: (a, b) => new Date(a.reportDate).getTime() - new Date(b.reportDate).getTime() 
      // },
      {
        key:"click",
        title: 'View',
        dataIndex: "isManualReport",
        render: ((stat:string,person: any) => 
        <>
        { 
          !stat ? (
          <a href={person.reportUrl} target="_blank" className="text-orange-700"><EyeIcon className='w-4'/></a>
        ) : (
          // <ViewPdf
          //   report={person}
          //   diagnosticDetails={diagnosticDetails as UserDetails}
          // />
          <></>
        )}
        </>
        ),
      },
      {
        key:"share",
        title: 'Delete',
        dataIndex: 'userName',
        render: ((userName:string,record) => <>
        <div className='flex justifty-between align-middle items-center h-[1vh]'>
            {/* <section className='mr-4 '>
              <a href={record.reportUrl} type="application/pdf" download={false} rel="noopener noreferrer" target="_blank" className="text-orange-700"><EyeIcon className='w-4 text-green-500'/></a>
            </section> */}
            <section className='self-center'>
              <a onClick={()=>{handleRemove(record)}}>
                <TrashIcon className='w-6 text-red-700'/>
              </a>
            </section>
  
        </div>
     </>),
      },
];