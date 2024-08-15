import { Space } from "antd";
import moment from "moment";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";

export const ADMIN_USER_ACTIVITES_COLUMNS = [
  {
    key: "activity",
    title: "Activity",
    dataIndex: "activity",
    // render: (text: any) => <a className='text-blue-800 font-medium'>{text}</a>,
    // sorter: (a: any, b: any) => a.activity.length - b.activity.length,
  },
  {
    key: "user",
    title: "Activity By",
    dataIndex: "user",
    render: (text: any) => <a>{text?.userName}</a>,
    // sorter: (a: any, b: any) => a.user.length - b.user.length,
  },
  {
    key: "updatedTime",
    title: "Activity Time",
    dataIndex: "updatedTime",
    render: (text: any) => <a>{moment(text).format("DD/MM/yyyy HH:mm:ss")}</a>,
    sorter: (a: any, b: any) =>
      moment(a.updatedTime).unix() - moment(b.updatedTime).unix(),
  },
];

export const ADMIN_USER_COLUMNS = [
  {
    title: "Name",
    dataIndex: "userName",
    key: "userName",
    sorter: (a, b) => a.userName.localeCompare(b.userName),
  },
  {
    title: "PhoneNumber",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    sorter: (a, b) => a.role.localeCompare(b.role),
    render: (role, record) => {
      return <p className="uppercase">{role}</p>;
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

export const BRANCH_EMPLOYEE_COLUMNS = ({
  selectedBranch,
  handleDelete,
  handleEdit,
}) => {
  return [
    {
      title: "Operator Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Operator Contact",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Operator Role",
      dataIndex: "roleName",
      key: "roleName",
      render: (_, record) => {
        const x = getRoleName(record?.diagnosticCenters, selectedBranch);
        return <p className="capitalize">{x ? x : ""}</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            <a href="#">
              <FaEdit
                className="text-red-gray"
                onClick={() => handleEdit(record)}
              />
            </a>
            <a href="#">
              <FaTrash
                className="text-red-500"
                onClick={() => handleDelete(record)}
              />
            </a>
          </Space>
        );
      },
    },
  ];
};

function getRoleName(data, branchId) {
  const diagnostic = data?.find((d) =>
    d.branches.some((branch) => branch.branchId === branchId),
  );

  if (diagnostic) {
    const branch = diagnostic?.branches.find(
      (branch) => branch.branchId === branchId,
    );
    return branch ? branch?.roleName : null;
  }

  return null;
}

export const BRANCH_DETAILS_COLUMNS = ({
  handleEdit,
  handleDelete,
  currentBranch,
}) => [
  {
    title: "Branch Name",
    dataIndex: "branchName",
    key: "branchName",
    render: (text: any) => <a className="text-blue-800 font-medium">{text}</a>,
    sorter: (a: any, b: any) => a.branchName.length - b.branchName.length,
  },
  {
    title: "Branch Email",
    dataIndex: "branchEmail",
    key: "branchEmail",
    render: (text: any) => <a>{text}</a>,
    sorter: (a: any, b: any) => a.branchEmail.length - b.branchEmail.length,
  },
  {
    title: "Branch Contact",
    dataIndex: "branchContact",
    key: "branchContact",
    render: (text: any) => <a>{text}</a>,
    sorter: (a: any, b: any) => a.branchContact.length - b.branchContact.length,
  },
  {
    title: "Branch Address",
    dataIndex: "branchAddress",
    key: "branchAddress",
    render: (text: any) => <a>{text}</a>,
    sorter: (a: any, b: any) => a.branchAddress.length - b.branchAddress.length,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => {
      if (
        record?.branchContact === currentBranch?.branchContact &&
        record?.branchName === currentBranch?.branchName &&
        record?.branchEmail === currentBranch?.branchEmail
      ) {
        return null;
      }

      return (
        <Space size="middle">
          <a href="#">
            <FaEdit
              className="text-red-gray"
              onClick={() => handleEdit(record)}
            />
          </a>
          <a href="#">
            <FaTrash
              className="text-red-500"
              onClick={() => handleDelete(record)}
            />
          </a>
        </Space>
      );
    },
  },
];

export const PATHOLOGIST_COLUMNS = ({ handleEdit, handleDelete }) => [
  {
    title: "Pathologist Name",
    dataIndex: "name",
    key: "name",
    render: (text: any) => <a className="text-blue-800 font-medium">{text}</a>,
    sorter: (a: any, b: any) => a.name.length - b.name.length,
  },
  {
    title: "Pathologist Designation",
    dataIndex: "designation",
    key: "designation",
    render: (text: any) => <a>{text}</a>,
    sorter: (a: any, b: any) => a.designation.length - b.designation.length,
  },
  {
    title: "Pathologist Signature",
    dataIndex: "signature",
    key: "signature",
    sorter: (a: any, b: any) => a.signature.length - b.signature.length,
    render: (text: any) => (
      <span className="w-[20px] h-[20px]">
        {text ? (
          <span className="object-cover border rounded">
            <Image alt="" width={150} height={40} src={text} />
          </span>
        ) : (
          <p className="font-light text-sm text-red-600">Not found</p>
        )}
      </span>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => {
      return (
        <Space size="middle">
          <a href="#">
            <FaEdit
              className="text-red-gray"
              onClick={() => handleEdit(record)}
            />
          </a>
          <a href="#">
            <FaTrash
              className="text-red-500"
              onClick={() => handleDelete(record)}
            />
          </a>
        </Space>
      );
    },
  },
];
