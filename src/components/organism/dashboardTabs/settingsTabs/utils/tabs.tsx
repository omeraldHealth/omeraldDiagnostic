import { Popover, Space, Tag } from "antd";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
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
          {/* <a href="#">
            <FaEdit
              className="text-red-gray"
              onClick={() => handleEdit(record)}
            />
          </a> */}
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

export const TEST_DETAILS_COLUMNS  = ({ handleEdit, handleDelete }) => [
    {
      key: "testName",
      title: "Test Name",
      dataIndex: "testName",
      render: (text: any) => <a>{text}</a>,
      sorter: (a: any, b: any) =>
        a.sampleType?.testName?.length - b.sampleType?.testName?.length,
    },
    {
      key: "sampleName",
      title: "Sample Name",
      dataIndex: "sampleName",
      render: (text: any) => <a>{text}</a>,
      sorter: (a: any, b: any) =>
        a.sampleType?.sampleName?.length - b.sampleType?.sampleName?.length,
    },
    {
      key: "parameter",
      title: "Parameters",
      dataIndex: "parameters",
      render: (parameters: any, record: any) => (
        <div
          style={{
            maxWidth: "20vw",
            maxHeight: "calc(3 * 20px + 2px)",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gap: "20px",
            }}
          >
            {parameters?.map((param: any, index: any) => (
              <a key={index} href="#">
                <Popover content={getPopOver(param)} title="Parameter Aliases">
                  <Tag className="my-1" color="green" key={param}>
                    {param?.name}
                  </Tag>
                </Popover>
              </a>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: "isActive",
      title: "Status",
      dataIndex: "isActive",
      sorter: (a: any, b: any) =>
        a.sampleType?.keywords.length - b.sampleType?.keywords.length,
      render: (text: any) => {
        if (text) {
          return <Tag color="green">Active</Tag>;
        } else {
          return <Tag color="red">Inactive</Tag>;
        }
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

export const PARAMETER_COLUMNS = ({ handleEdit, handleDelete }) => [
  {
    title: "Parameter",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (text) => (
      <div style={{ maxWidth: 100, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={text}>
        {text}
      </div>
    ),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (text) => (
      <div style={{ maxWidth: 100, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={text}>
        {text}
      </div>
    ),
  },
  {
    title: "Remedy",
    dataIndex: "remedy",
    key: "remedy",
    render: (text) => (
      <div style={{ maxWidth: 100, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={text}>
        {text}
      </div>
    ),
  },
  // {
  //   title: "Unit",
  //   dataIndex: "units",
  //   key: "units",
  //   width: 100,
  //   render: (_, record) => (
  //     <Popover title="Units" trigger="hover">
  //       <div >
  //         <ParameterUnitsColumn data={record} />
  //       </div>
  //     </Popover>
  //   ),
  // },
  {
    title: "Alias",
    dataIndex: "aliases",
    key: "aliases",
    render: (aliases = []) => {
      const displayAliases = aliases.slice(0, 3);
      const moreDots = aliases.length > 3;

      return (
        <Popover content={aliases.join(', ')} title="Aliases" trigger="hover">
          <Space size={[0, 1]} wrap>
            {displayAliases.map((alias) => (
              <Tag color="geekblue" key={alias}>
                {alias}
              </Tag>
            ))}
            {moreDots && <Tag color="geekblue">...</Tag>}
          </Space>
        </Popover>
      );
    },
  },
  {
    title: "Bio Ref",
    dataIndex: "bioRefRange",
    key: "bioRefRange",
    width: 100,
    render: (bioRefRange = []) => {
      // const displayBioRefRange = bioRefRange?.length>0 && bioRefRange?.slice(0, 3);
      return (
        <Popover
          content={getContent(bioRefRange)}
          title="Bio Ref Range Details"
          trigger="hover"
        >
          <div style={{ maxWidth: 130, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <Tag color="blue">Reference value</Tag>
          </div>
        </Popover>
      );
    },
  },
  {
    title: "Status",
    dataIndex: "isActive",
    key: "isActive",
    filters: [
      { text: "Active", value: true },
      { text: "Inactive", value: false },
    ],
    onFilter: (value, record) => record.isActive === value,
    render: (isActive) => (
      <Tag color={isActive ? "green" : "red"}>
        {isActive ? "Active" : "Inactive"}
      </Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a><FaEdit className="text-red-gray" onClick={() => handleEdit(record)}/></a>
        <a><FaTrash className="text-red-500" onClick={() => handleDelete(record)}/></a>
      </Space>
    ),
  },
];


const getPopOver = (param: any) => (
  <div className="max-w-[5vw]">
    <p>
      <strong>Name</strong>: {param?.name}
    </p>
    <p
      style={{ width: 300, wordWrap: "break-word", whiteSpace: "pre-wrap" }}
      className="overflow-hidden whitespace-nowrap"
    >
      <strong>Description</strong>: {param?.description}
    </p>
    <p>
      <strong>Aliases</strong>: {param?.aliases?.join(", ")}
    </p>
    <p>
      <strong>IsActive</strong>: {param?.isActive ? "Yes" : "No"}
    </p>
    <p>
      <strong>BioRefRange</strong>:
      <br />
      {param?.bioRefRange?.basicRange?.map((basic: any, index: number) => (
        <span key={index}>
          Basic: unit: {basic.unit}, min: {basic.min}, max: {basic.max}
          <br />
        </span>
      ))}
    </p>
  </div>
);

const extractAllUnits = (data: any) => {
  const basicRangeUnits = data?.bioRefRange?.basicRange?.map((range: any) => range.unit) || [];
  
  const ageRangeUnits = data?.bioRefRange?.advanceRange?.ageRange?.map((range: any) => range.unit) || [];
  
  const genderRangeUnits = data?.bioRefRange?.advanceRange?.genderRange?.map((range: any) => range.unit) || [];
  
  const customCategoryUnits = data?.bioRefRange?.advanceRange?.customCategory?.flatMap((category: any) => 
    category.categoryOptions?.map((option: any) => option.unit) || []
  ) || [];
  
  // Combine all units and remove duplicates
  const allUnits = [
    ...basicRangeUnits,
    ...ageRangeUnits,
    ...genderRangeUnits,
    ...customCategoryUnits
  ];
  
  // Remove duplicates
  const uniqueUnits = Array.from(new Set(allUnits));
  
  return uniqueUnits;
};

const ParameterUnitsColumn = ({ data }) => {

  const [visibleUnits, setVisibleUnits] = useState<string[]>([]);
  const allUnits =  extractAllUnits(data);

  const handlePopoverVisibleChange = (visible: boolean) => {
    setVisibleUnits(visible ? allUnits : []);
  };

  const renderContent = () => (
    <Space wrap>
      {allUnits.map((unit, index) => (
        <Tag color="green" key={index}>
          {unit}
        </Tag>
      ))}
    </Space>
  );

  return (
    <Popover
      content={renderContent()}
      title="All Units"
      trigger="click"
      visible={visibleUnits.length > 0}
      onVisibleChange={handlePopoverVisibleChange}
    >
      <Tag color="green" style={{ cursor: "pointer" }}>
        Show Units
      </Tag>
    </Popover>
  );
};

const getContent = (bioRefRange: any) => {
  console.log("bioref", bioRefRange)
  const formatRange = (min: any, max: any, unit: any) => {
    if (min && max) return `${min} > and < ${max} ${unit || ""}`;
    if (min) return `> ${min} ${unit || ""}`;
    if (max) return `< ${max} ${unit || ""}`;
    return null;
  };

  const hasAdvancedData = bioRefRange?.advanceRange &&
    (bioRefRange.advanceRange.ageRange?.length > 0 ||
     bioRefRange.advanceRange.genderRange?.length > 0 ||
     bioRefRange.advanceRange.customCategory?.length > 0);

  return (
    <div style={{ maxHeight: "50vh", overflowY: "auto", padding: "0 10px" }}>
      {/* Basic Range */}
      {bioRefRange?.basicRange?.map((basic: any, basicIndex: number) => (
        <div key={basicIndex} className="mb-4">
          <p className="font-bold">Basic Range:</p>
          <p>{formatRange(basic.min, basic.max, basic.unit)}</p>
        </div>
      ))}

      {/* Advanced Range */}
      {hasAdvancedData && (
        <div>
          <p className="font-bold">Advanced Range:</p>
          <div className="ml-2">
            {/* Age Range */}
            {bioRefRange.advanceRange?.ageRange?.map((age: any, ageIndex: number) => (
              <div key={ageIndex}>
                <p>Age Range:</p>
                <p className="ml-4">{`${age.ageRangeType}: ${formatRange(age.min, age.max, age.unit)}`}</p>
              </div>
            ))}

            {/* Gender Range */}
            {bioRefRange.advanceRange?.genderRange?.map((gender: any, genderIndex: number) => (
              <div key={genderIndex}>
                <p>Gender Range:</p>
                <p className="ml-4">{`${gender.genderRangeType} Range: ${formatRange(gender.min, gender.max, gender.unit)}`}</p>
                {gender.genderRangeType === "female" && gender.details && (
                  <div className="ml-6">
                    <p>Details:</p>
                    <div className="ml-6">
                      {gender.details.menopause && <p>Menopause: Yes</p>}
                      {gender.details.prePuberty && <p>Pre-Puberty: Yes</p>}
                      {gender.details.pregnant && (
                        <>
                          <p>Pregnant: Yes</p>
                          {gender.details.trimester?.type !== "none" && (
                            <p className="ml-6">
                              Trimester: {gender.details.trimester.type}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Custom Category */}
            {bioRefRange.advanceRange?.customCategory?.map((category: any, catIndex: number) => (
              <div key={catIndex}>
                <p className="font-bold">Custom Range:</p>
                <p>{category.categoryName}</p>
                {category.categoryOptions?.map((option: any, optIndex: number) => (
                  <p key={optIndex} className="ml-4">
                    {`${option.categoryType}: ${formatRange(option.min, option.max, option.unit)}`}
                  </p>
                ))}
                {category.subCategory && (
                  <div className="ml-4">
                    <p>{category.subCategory.categoryName}</p>
                    {category.subCategory.categoryOptions?.map((subOpt: any, subOptIndex: number) => (
                      <p key={subOptIndex} className="ml-4">
                        {`${subOpt.categoryType}: ${formatRange(subOpt.min, subOpt.max, subOpt.unit)}`}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};