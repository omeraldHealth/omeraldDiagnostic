import { testDetailsState } from "@components/common/recoil/testDetails";
import { Button, Col, Dropdown, Form, Input, List, Menu, Modal, Popover, Radio, Row, Select, Space, Steps, Switch, Table, Tabs, Tag } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {testDataState} from "../../common/recoil/testDetails/test"
import { FaSearchMinus } from "react-icons/fa";
import { ArrowDownIcon, MinusCircleIcon, PlusCircleIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useForm } from "antd/es/form/Form";
import { useUpdateDiagnostic } from "utils/reactQuery";
import { errorAlert, successAlert } from "@components/atoms/alerts/alert";
import { profileState } from "@components/common/recoil/profile";
import { useCurrentBranchValue } from "@components/common/constants/recoilValues";
import { SuccessTest } from "../addTest/successTest";

const { Step } = Steps;
const { TabPane } = Tabs;

export const AddTestComponent: React.FC<any> = ({ setTest, edit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const prev = () => setCurrentStep(currentStep-1)
  const next = () => setCurrentStep(currentStep+1)
  const [testDetailState, setTestDetail] = useRecoilState(testDataState);
  const [profile, setProfile] = useRecoilState(profileState);
  const currentBranch = useCurrentBranchValue();

  const updateDiagnostic = useUpdateDiagnostic({
    onSuccess: (data) => {
      successAlert('Profile updated successfully');
      setProfile(data?.data);
      next()
    },
    onError: () => {
      errorAlert('Error updating profile');
      // setLoading(false)
    },
  });

  const handleSubmitTest = () => {
    console.log("submiting", testDetailState)
    updateDiagnostic.mutate({
          data: { id: profile?._id, tests: [...profile?.tests, { ...testDetailState, branchId: currentBranch?._id }] },
    });
  }

  const steps = [
    {
      title: 'Choose Test Type',
      content: <TestDetail next={next}/>
    },
    {
      title: 'Add Parameters',
      content: <TestParams data={testDetailState?.parameter} />
    },
    {
      title: 'Success Test',
      content: <SuccessTest handleSuccess={()=>{setTest(false)}}/>
    },
  ];

  return <div className="container mx-auto p-8">
      <div className="w-[100%]">
            <Steps current={currentStep}>
                {steps.map(item => (
                    <Steps key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="mt-5">{steps[currentStep].content}</div>
            <div>
               {currentStep === 1 && <Button type="primary" onClick={prev} className="ml-5" >Previous</Button>}
               {currentStep === 1 && <Button type="dashed" onClick={handleSubmitTest} className="ml-5" >Submit</Button>}
            </div>
      </div>
  </div>
}

const TestDetail = ({next}:any) => {
  const [selectedValue,setSelectedValue] = useState(false);
  return  <div>
    <TestDetailHeader selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
    {selectedValue?<p></p>:<CustomTestDetails next={next}/>}
  </div>
} 

const TestDetailHeader: React.FC<any> = ({ selectedValue, setSelectedValue }) => {
  return (
    <section>
      <section className="my-6">
        <p className="my-4 text-sm">You want to choose from existing reports?</p>
        <Radio.Group onChange={(event) => setSelectedValue(event.target.value)} value={selectedValue}>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </section>
    </section>
  );
};

const CustomTestDetails: React.FC<any> = ({next}:any) => {

  const [testDetailState, setTestDetail] = useRecoilState(testDataState);
  
  const onFinish = (values: any) => {
    setTestDetail(values)
    next()
  };

  return (  
    <section>
      <Form
       layout="vertical" 
        onFinish={onFinish} // Set the function to handle form submission
      >
        <Form.Item
          name="testName"
          label="Enter Test Name"
          initialValue={testDetailState?.testName}
          rules={[{ required: true, message: 'Please input the test name!' }]} // Added rules for validation
        >
          {/* Ensure the input takes the full width of the form item */}
          <Input className="w-[20vw]" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export const getContent = (bioRefRange) => {
  // Helper function to format range string based on available min and max values
  const formatRange = (min, max, unit) => {
    if (min && max) {
      return `${min} > and < ${max} ${unit || ''}`;
    } else if (min) {
      return `> ${min} ${unit || ''}`;
    } else if (max) {
      return `< ${max} ${unit || ''}`;
    }
  };

  // Determine if there's data for the advanced range to decide on displaying the section
  const hasAdvancedData = bioRefRange.advanceRange && (
    bioRefRange.advanceRange.ageRange?.length > 0 ||
    bioRefRange.advanceRange.genderRange?.length > 0 ||
    bioRefRange.advanceRange.customCategory?.length > 0
  );

  return (
    <div style={{ maxHeight: '50vh', overflowY: 'auto', padding: '0 10px' }}>
      {/* Basic Range */}
      {bioRefRange.basicRange && bioRefRange.basicRange.map((basic, basicIndex) => (
        <div key={basicIndex} className="mb-4">
          <p className="font-bold">Basic Range:</p>
          <p>{formatRange(basic.min, basic.max, basic.unit)}</p>
        </div>
      ))}

      {/* Advanced Range - Conditional rendering based on hasAdvancedData */}
      {hasAdvancedData && (
        <div>
          <p className="font-bold">Advanced Range:</p>
          <div className="ml-2">
            {/* Age Range */}
            {bioRefRange.advanceRange.ageRange && bioRefRange.advanceRange.ageRange.map((age, ageIndex) => (
              <div key={ageIndex}>
                <p>Age Range:</p>
                <p className="ml-4">{`${age.ageRangeType}: ${formatRange(age.min, age.max, age.unit)}`}</p>
              </div>
            ))}

            {/* Gender Range */}
            {bioRefRange.advanceRange.genderRange && bioRefRange.advanceRange.genderRange.map((gender, genderIndex) => (
              <div key={genderIndex}>
                <p>Gender Range:</p>
                <p className="ml-4">{`${gender.genderRangeType} Range: ${formatRange(gender.min, gender.max, gender.unit)}`}</p>
                {gender.genderRangeType === 'female' && gender.details && (
                  <div className="ml-6">
                    <p>Details:</p>
                    <div className="ml-6">
                      {gender.details.menopause && <p>Menopause: Yes</p>}
                      {gender.details.prePuberty && <p>Pre-Puberty: Yes</p>}
                      {gender.details.pregnant && (
                        <>
                          <p>Pregnant: Yes</p>
                          {gender.details.trimester && gender.details.trimester?.type !== 'none' && (
                            <p className="ml-6">Trimester: {gender.details.trimester?.type}</p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Custom Category */}
            {bioRefRange.advanceRange.customCategory && bioRefRange.advanceRange.customCategory.map((category, catIndex) => (
              <div key={catIndex}>
                <p className="font-bold">Custom Range:</p>
                <p>{category.categoryName}</p>
                {category.categoryOptions && category.categoryOptions.map((option, optIndex) => (
                  <p key={optIndex} className="ml-4">{`${option.categoryType}: ${formatRange(option.min, option.max, option.unit)}`}</p>
                ))}
                {category.subCategory && (
                  <div className="ml-4">
                    <p>{category.subCategory.categoryName}</p>
                    {category.subCategory.categoryOptions && category.subCategory.categoryOptions.map((subOpt, subOptIndex) => (
                      <p key={subOptIndex} className="ml-4">{`${subOpt.categoryType}: ${formatRange(subOpt.min, subOpt.max, subOpt.unit)}`}</p>
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

const parameterColumns = [
  {
    title: 'Parameter',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
    width: 150,
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: text => <div style={{ width: 150,  wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{text}</div>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    width: 100,
    render: text => <div style={{ width: 200,  wordWrap: 'break-word', whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: text }}></div>,
  },
  {
    title: 'Remedy',
    dataIndex: 'remedy',
    key: 'remedy',
    width: 100,
    render: text => <div style={{ width: 100,  wordWrap: 'break-word', whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: text }}></div>,
  },
  {
    title: 'Unit',
    dataIndex: 'units',
    key: 'units',
    width: 100,
    render: (text, record) => <ParameterUnitsColumn data={record}  />
  },
  {
    title: 'Alias',
    dataIndex: 'aliases',
    key: 'aliases',
    width: 250,
    filterIcon: filtered => (
      <FaSearchMinus style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder="Search aliases"
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          // onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          {/* <Button type="primary" onClick={() => handleSearch(selectedKeys, confirm)}>
            Search
          </Button> */}
          <Button onClick={() => clearFilters && clearFilters()}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    onFilter: (value, record) => record.aliases.some(alias => alias.toLowerCase().includes(value.toLowerCase())),
    render: aliases => {
      let moreDots = false;
      if (aliases?.length > 3) {
        aliases = aliases.slice(0, 3);
        moreDots = true;
      }
      return (
        <Space onMouseEnter={() => {}} size={[0, 1]} wrap>
          {aliases?.map(alias => (
            <Tag color="geekblue" key={alias}>
              {alias}
            </Tag>
          ))}
          {moreDots && <Tag color="geekblue">...</Tag>}
        </Space>
      );
    },
  },
  {
    title: 'Bio Ref',
    dataIndex: 'bioRefRange',
    key: 'bioRefRange',
    width: 100,
    render: (bioRefRange,record) => {
      let moreDots = false;
      if (bioRefRange?.length > 3) {
        bioRefRange = bioRefRange.slice(0, 3);
        moreDots = true;
      }
      return (
        <>
        <Popover content={getContent(bioRefRange)} title="Bio Ref Range Details" trigger="hover">
          <Tag color="blue">Reference value</Tag>
        </Popover>
        </>
      );
    },
  },
  {
    title: 'Status',
    key: 'isActive',
    dataIndex: 'isActive',
    filters: [
      { text: 'Active', value: true },
      { text: 'Inactive', value: false },
    ],
    onFilter: (value, record) => record.isActive === value,
    render: active => (
      <span>
        <Tag color={active ? 'green' : 'red'}>
          {active ? 'Active' : 'Inactive'}
        </Tag>
      </span>
    ),
  },
];

const ParameterUnitsColumn = ({ data }) => {

  if(data){
    const [visibleUnits, setVisibleUnits] = useState([]);
    const allUnits = extractUnitValues(data?.bioRefRange);

  
    const handlePopoverVisibleChange = visible => {
      if (visible) {
        setVisibleUnits(allUnits);
      } else {
        setVisibleUnits([]);
      }
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
        <Tag color="green" style={{ cursor: 'pointer' }}>
          Show Units
        </Tag>
      </Popover>
    );
  }else{
    <p>null</p>
  }

 
};

// Function to extract unique unit values
const extractUnitValues = (bioRefRange) => {
  const units = new Set();

  // Extract units from advanceRange
  const { advanceRange } = bioRefRange;
  Object.values(advanceRange).forEach((ranges) => {
    ranges.forEach((range) => {
      units.add(range.unit);
    });
  });

  // Extract units from basicRange
  const { basicRange } = bioRefRange;
  basicRange.forEach((range) => {
    units.add(range.unit);
  });

  return Array.from(units);
};


const TestParams: React.FC<any> = ({data=[]}:any) => {
  return <div className="min-h-[50vh] h-auto">
    <Table
        dataSource={data}
        className="min-h-[50vh]"
        columns={parameterColumns}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: [`${10}` || '4', '10', '20', '50', '100'],
          // onShowSizeChange: (current, size) => setPageSize(size), // Update the page size
        }}
        scroll={{ x: 'max-content' }}
      />
    <span className="flex justify-end">
    {/* <a className="bg-green-800 rounded p-2 text-white" href="#"><p className="flex text-xs"><PlusCircleIcon className="w-4 mx-2" /> Add Param </p></a> */}
    <ParameterComponent/>
    </span>

  </div>
}

const ParameterComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="">
      <Button type="primary" onClick={showModal}>
        Create New Parameter
      </Button>
      <ParameterModal 
        isModalVisible={isModalVisible} 
        handleOk={handleOk} 
        handleCancel={handleCancel} 
      />
    </div>
  );
};

const ParameterModal = ({ isModalVisible, handleOk, handleCancel }) => {

  const [addRange, setAddRange] = useState(false)
  const [sampleOptions, setSampleOptions] = useState();
  const [bioRange, setBioRange] = useState([]);

  // const title = isEdit ? updateParameterMeta.title : createParameterMeta.title;
  // const { data: parameters = [], isLoading } = useGetParameters();

  const [sampleType,setSampleType] = useState();
  const [gender,setGender] = useState("male");
  const [ageRange,setAgeRange] = useState([]);

  const [rangeType,setRangeType] = useState("basic");
  const [basicRange,setBasicRange] = useState([]);
  const [advanceRange,setAdvanceRange] = useState([]);
  const [form] = Form.useForm();
  const [testDetailState, setTestDetail] = useRecoilState(testDataState);
  const [profile, setProfile] = useRecoilState(profileState);
  const currentBranch = useCurrentBranchValue();

  const updateDiagnostic = useUpdateDiagnostic({
    onSuccess: (data) => {
      successAlert('Profile updated successfully');
      setProfile(data?.data);
      handleOk();
      // setLoading(false)
    },
    onError: () => {
      errorAlert('Error updating profile');
      // setLoading(false)
    },
  });

  const handleSubmitBioRange = data => {
    let object = {};
  
    if(rangeType === "basic"){
      object.rangeType = "basic";
      object.min = Number(basicRange.min);
      object.max = Number(basicRange.max);
  
      // Check if a basic range exists and update it
      const basicIndex = bioRange.findIndex(range => range.rangeType === "basic");
      if (basicIndex !== -1) {
        bioRange[basicIndex] = object; // Update existing basic range
      } else {
        bioRange.push(object); // Add new basic range
      }
    } else {
      // Handle advance range submission
      // No changes required here since advance range is handled in separate components
    }
  
    setBioRange([...bioRange]);
    setAdvanceRange([]);
    setRangeType("basic");
    setAddRange(false);
  };  

  const handleRemove = (data) => {
    if(data?.ageRangeType || data?.genderRangeType) {
      setAdvanceRange(advanceRange.filter(obj => JSON.stringify(obj) !== JSON.stringify(data)))
    }else{
      setBasicRange(basicRange.filter(obj => JSON.stringify(obj) !== JSON.stringify(data)))
    }
  } 

  const handleSubmit = () => {

    const advanceRanges = {
      ageRange: [],
      genderRange: [],
    };

    form.validateFields().then(values => {
        advanceRange?.forEach((item) => {
        if (item.ageRangeType) {
          advanceRanges.ageRange.push({
            ageRangeType: item.ageRangeType,
            unit: item.unit,
            min: parseInt(item.min, 10), // Ensure base 10 for parsing
            max: parseInt(item.max, 10),
          });
        } else if (item.genderRangeType) {
          advanceRanges.genderRange.push({
            genderRangeType: item.genderRangeType,
            unit: item.unit,
            min: parseInt(item.min, 10),
            max: parseInt(item.max, 10),
          });
        }
        });
        values.bioRefRange = {
          basicRange: basicRange,
          advanceRange: advanceRanges
        }
        const updatedDetails = {
          ...testDetailState,  // Spread the existing state to retain other properties
          parameter: [
            // Spread existing parameters if it's an array, otherwise start with an empty array
            ...(Array.isArray(testDetailState.parameter) ? testDetailState.parameter : []),
            // Add new values, ensuring they are treated as an array
            ...(Array.isArray(values) ? values : [values])
          ]
        };
      
        console.log('Form Values:', updatedDetails); // Here you get all the values from the form 
        setTestDetail(updatedDetails)
        handleOk()
        // updateDiagnostic.mutate({
        //   data: { id: profile?._id, tests: [...profile?.tests, { ...updatedDetails, branchId: currentBranch?._id }] },
        // });
    }).catch(info => {
        console.log('Validate Failed:', info);
    });
  };

  return (
    <Modal    
      title="Create New Parameter" 
      visible={isModalVisible} 
      onOk={handleSubmit} 
      onCancel={handleCancel} 
      style={{ padding: 0, minWidth: '50%' }}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" className="m-auto">
        <section className="flex gap-12">
            <section className="min-w-[45%]">
              <Form.Item 
                name="name" 
                label="Name" 
                rules={[{ required: true, message: 'Please input the parameter name!' }]}
              >
                <Input placeholder="Enter Parameter Name" className="w-full" />
              </Form.Item>
              <Form.Item name="isActive" label="Is Active?" valuePropName="checked">
                <Switch className="mt-1" />
              </Form.Item>
              <Form.Item name="aliases" label="Aliases">
              <Select
                  mode="tags"
                  // ref={ref}
                  name={'aliases'}
                  placeholder={"Enter Aliases"}
                  // value={value}
                  maxTagCount={15}
                  style={{
                    width: '100%',
                  }}
                  // onChange={handleInputChange}
                  // options={options}
                />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <Input.TextArea placeholder="Enter description" className="w-full" />
              </Form.Item>
              <Form.Item name="remedy" label="Remedy">
                <Input.TextArea placeholder="Enter Remedy" className="w-full" />
              </Form.Item>
            </section>
            <section>
              <Form.Item name={"unit"} label="">
                <Row>
                  <Col span={24}>
                  <section className='flex justify-between items-center mx-3'>
                    <p level={5} className='p-0 m-0' style={{ fontWeight: 'normal' }}>Add Bio Ref Ranges</p>
                    <a href="#"><PlusIcon className="w-6 bg-blue-900 text-white rounded-full" onClick={() => setAddRange(!addRange)} /></a>
                  </section>

                  </Col>
                  {addRange && <section className='p-3'>    
                    <InputForm
                      formHook={{}} 
                      sampleOptions={sampleOptions}
                      rangeType={rangeType}
                      setRangeType={setRangeType}
                      setSampleType={setSampleType}
                      setGender={setGender}
                      submitRange={handleSubmitBioRange}
                      setAgeRange={setAgeRange}
                      setAddRange={setAddRange}
                      setBasicRange={setBasicRange}
                      basicRange={basicRange}
                      setAdvanceRange={setAdvanceRange}
                      advanceRange={advanceRange}
                      index={0}
                    />
                  </section>}
                  <section className='px-3'>
                      <DisplayValues basicRange={basicRange} advanceRange={advanceRange} handleRemove={handleRemove} />
                  </section>
                </Row>
              </Form.Item>
            </section>
          </section>
      </Form>
    </Modal>
  );
};

const InputForm = ({formHook,sampleOptions,setSampleType,setGender,rangeType,setBasicRange,basicRange,
  setRangeType,setAgeRange, submitRange,setAddRange,setAdvanceRange,advanceRange}) => {

const [addBasicRange, setAddBasicRange] = useState(false);
const [form] = Form.useForm();

const hideCreateModal =() => {
  setAddBasicRange(false)
}

const handleBasicUnit = (newValues) => {
  // Assume newValues is an array of new items to potentially add or update
  newValues.forEach(newValue => {
    const exists = basicRange.some(item => item.unit === newValue.unit);
    if (exists) {
      // If an item with the same unit exists, update it
      setBasicRange(current =>
        current.map(item => 
          item.unit === newValue.unit ? { ...item, ...newValue } : item
        )
      );
    } else {
      // If no item with the same unit exists, add the new item
      setBasicRange(current => [...current, newValue]);
    }
  });
};

useEffect(() => {
}, [advanceRange]);

const handleAdvanceRangeSubmit = (data) => {
  setAdvanceRange((currentRanges) => {
    let updated = false; // Flag to check if the array was updated
  
    const updatedRanges = currentRanges.map(range => {
      // Determine the type (ageRange or genderRange) and the key (ageRangeType or genderRangeType)
      const type = data?.ageRange ? "ageRange" : "genderRange";
      const keyType = data?.ageRange ? "ageRangeType" : "genderRangeType";
  
      // Check if the range and data[type] are defined
      if (range[type] && data[type]) {
        // Check if any range in the currentRanges matches the incoming data's type and key
        const matchingRangeIndex = range[type]?.findIndex(item => item[keyType] === data[type][0][keyType]);
  
        if (matchingRangeIndex !== -1) {
          // If a matching range is found, update it
          updated = true;
          range[type][matchingRangeIndex] = data[type][0];
        }
      }
  
      return range; // Return the updated or unchanged range
    });
  
    if (!updated) {
      // If no matching range found, append the new data
      updatedRanges.push(data);
    }
    console.log("updateRange",updatedRanges)
    return updatedRanges;
  });
  
};

const handleSubmit = (data) => {
  setAddRange(false);
}

return (
  <Form
    name="AddRangeForm"
    layout="vertical"
    form={form}
  >
    <Row>
      <Col span={24}>
        <Row>
          <Col span={24}>
            <section className='mb-4'>
              <Radio.Group defaultValue={"basic"} onChange={(range)=>{setRangeType(range.target.value)}}>
                <Radio value="basic">Basic</Radio>
                <Radio value="advance">Advance</Radio>
              </Radio.Group>
            </section>
          </Col>
          {rangeType === "basic" ? (
            <BasicRangeInput  handleBasicUnit={handleBasicUnit} />
          ) : (
            <AdvanceRangeInput handleAdvanceRangeSubmit={handleAdvanceRangeSubmit} />
          )}
        </Row>  
      </Col>
    </Row>
    {rangeType === "basic" &&
    <Row>
      <Col>
        <Form.Item>
          <Button
            type="primary"
            className="mr-2"
            htmlType="button" onClick={() => form.validateFields().then(handleSubmit)}>
            Add Range
          </Button>
          <Button htmlType="button" onClick={() => { 
            setRangeType("basic");
            setAddRange(false);
          }}>
            Cancel
          </Button>
        </Form.Item>
      </Col>
    </Row>}
  </Form>
);
};

const AdvanceRangeInput = ({ handleAdvanceRangeSubmit }) => {
const [selectedOption, setSelectedOption] = useState({ category: null, choice: null });

const advanceRangeOptions = {
  "ageRange": [
    { "key": "adult", "label": "Adult" },
    { "key": "senior", "label": "Senior" },
    { "key": "pediatric", "label": "Pediatric" }
  ],
  "genderRange": [
    { "key": "male", "label": "Male" },
    { "key": "female", "label": "Female" },
    { "key": "other", "label": "Other" }
  ]
};

const handleMenuClick = e => {
  const [category, choice] = e.keyPath.reverse(); // Reverse to get category first, choice second
  setSelectedOption(prevState => {
    if (prevState.category === category && prevState.choice === choice) {
      // If the selected option is the same as the previous one, force the update
      return { category: null, choice: null };
    } else {
      return { category, choice };
    }
  });
};

const renderSubMenuItems = (items) => items.map(item => (
  <Menu.Item key={item.key}>{item.label}</Menu.Item>
));

const handleSubmit = (value)=> {
  setSelectedOption({ category: null, choice: null })
  handleAdvanceRangeSubmit(value)
}

const menu = (
  <Menu onClick={handleMenuClick}>
    {Object.entries(advanceRangeOptions).map(([key, values]) => (
      <Menu.SubMenu key={key} title={key.charAt(0).toUpperCase() + key.slice(1).replace('Range', ' Range')}>
        {renderSubMenuItems(values)}
      </Menu.SubMenu>
    ))}
  </Menu>
);

return (
  <div className='w-[20vw] mb-4'>
    <section className='mb-4'>
      <Dropdown overlay={menu}>
        <Button className="flex">
          Choose Advance Range <ArrowDownIcon  className="w-5"/>
        </Button>
      </Dropdown>
    </section>
   
    {selectedOption.category === 'ageRange' && <AgeRangeForm key={selectedOption.choice} ageRangeType={selectedOption.choice} choice={selectedOption.choice} onFinish={handleSubmit} />}
    {selectedOption.category === 'genderRange' && <GenderRangeForm key={selectedOption.choice} genderRangeType={selectedOption.choice} choice={selectedOption.choice} onFinish={handleSubmit}/>}
  </div>
);
};

const DisplayValues = ({ basicRange, advanceRange, handleRemove }) => {
return (
  <div className='px-3 my-3'>
    <strong style={{ display: 'block', marginBottom: '8px' }}>Basic Range</strong>
    <List
      dataSource={basicRange}
      renderItem={item => (
        <section className='flex justify-between items-baseline'>
        <div className="flex items-center">
          <p className='align-start'>Unit: {item.unit}</p>
          <p className='mx-2'>Min: {item?.min}</p>
          <p className='mx-2'>Max: {item?.max}</p>
        </div>
        <div className="ml-auto">
          <MinusCircleIcon className="text-red-500"  onClick={()=>{handleRemove(item)}} />
        </div>
      </section>
      )}
    />
    <strong style={{ display: 'block', marginBottom: '8px', marginTop: '16px' }}>Advance Range</strong>
    <List
      dataSource={advanceRange}
      renderItem={item => (
        <List.Item > 
            <section className='flex justify-between items-baseline'>
            <div className="flex items-center">
              <p className="capitalize text-green-900">{item?.ageRangeType} {item.genderRangeType} - </p>
              <p className='mx-2' >Unit: {item.unit}</p>
              <p className="ml-2">Min: {item?.min}</p>
              <p className="ml-2">Max: {item?.max}</p>
            </div>
            <div className="ml-2">
              <MinusCircleIcon className="text-red-500" onClick={()=>{handleRemove(item)}} />
            </div>
          </section>
        </List.Item>
      )}
    />
  </div>
);
};

const BasicRangeInput = ({ handleBasicUnit }) => {
  const [form] = Form.useForm();
  const [isSubmitButtonVisible, setIsSubmitButtonVisible] = useState(false);

  const onFormValuesChange = (_, allValues) => {
    const hasValues = allValues.basicRanges?.some(range => range?.unit || range?.min || range?.max);
    setIsSubmitButtonVisible(hasValues);
  };

  const handleSubmit = (values) => {
    handleBasicUnit(values.basicRanges);
    form.resetFields();
    setIsSubmitButtonVisible(false);
  };

  // Custom validator for Min and Max fields
  const requiredMinOrMax = ({ getFieldValue }) => ({
    validator(_, value) {
      const basicRanges = getFieldValue('basicRanges') || [];
      const isValid = basicRanges.every(range => range.min !== undefined || range.max !== undefined);

      return isValid ? Promise.resolve() : Promise.reject(new Error('Either Min or Max is required'));
    },
  });

  return (
    <Form 
      name="addAdvanceRangeForm" 
      layout="vertical" 
      form={form} 
      onValuesChange={onFormValuesChange}
    >
      <Form.List name="basicRanges">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'unit']}
                  label="Unit"
                  rules={[{ required: true, message: 'Please enter unit' }]}
                >
                  <Input placeholder="Unit" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'min']}
                  label="Min"
                  rules={[requiredMinOrMax]}
                >
                  <Input type="number" placeholder="Min" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'max']}
                  label="Max"
                  rules={[requiredMinOrMax]}
                >
                  <Input type="number" placeholder="Max" />
                </Form.Item>
                <MinusCircleIcon onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" className="flex" onClick={() => add()} block icon={<PlusCircleIcon className="w-6" />}>
                Add Range
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      {isSubmitButtonVisible && (
        <Form.Item>
          <Button type="primary" htmlType="button" onClick={() => form.validateFields().then(handleSubmit)}>
            Submit All Ranges
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

const AgeRangeForm = ({ onFinish, ageRangeType }) => {
  const [form] = Form.useForm();
  const [isFormVisible, setIsFormVisible] = useState(true); // State to control form visibility

  const handleSubmit = (values) => {
    const submittedValues = {
      ...values?.ageRange,
      ageRangeType,
    };
    onFinish(submittedValues); // Handle the form values, e.g., by logging or sending to a server
    form.resetFields(); // Reset the form fields
    setIsFormVisible(false); // Hide the form after submission
  };

  if (!isFormVisible) {
    return null; // Do not render the form if isFormVisible is false
  }

  // Custom validator for Min and Max fields
  const requiredMinOrMax = ({ getFieldValue }) => ({
    validator(_, value) {
      const ageRange = getFieldValue('ageRange') || {};
      if (!ageRange.min && !ageRange.max) {
        return Promise.reject(new Error('Either Min or Max is required'));
      }
      return Promise.resolve();
    },
  });

  return (
    <Form name="addAdvanceRangeForm" layout="vertical" form={form}>
      <div style={{ marginBottom: 16 }}>
        <h3>Add Age Range for {ageRangeType}</h3>
      </div>
      <Space style={{ display: 'flex', marginBottom: 8 }}>
        <Form.Item
          name={['ageRange', 'unit']}
          label="Unit"
          rules={[
            { required: true, message: 'Please enter unit' },
            // {
            //   pattern: /^(?=[a-zA-Z])([a-zA-Z0-9 !@#$%^&*()-_=+{}\[\]:;'"<>,./?])*/,
            //   message: 'Please enter a valid unit (alpha, alphanumeric, or alpha-special characters, starting with alpha)',
            // },
          ]}
        >
          <Input placeholder="Unit" />
        </Form.Item>
        <Form.Item
          name={['ageRange', 'min']}
          label="Min"
          rules={[requiredMinOrMax]}
        >
          <Input type="number" placeholder="Min" />
        </Form.Item>
        <Form.Item
          name={['ageRange', 'max']}
          label="Max"
          rules={[requiredMinOrMax]}
        >
          <Input type="number" placeholder="Max" />
        </Form.Item>
      </Space>
      <Form.Item>
        <Button type="primary" htmlType="button" onClick={() => form.validateFields().then(handleSubmit)}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const GenderRangeForm = ({ onFinish, genderRangeType }) => {
  const [form] = Form.useForm();
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [selectedDetails, setSelectedDetails] = useState("");

  const handleSubmit = (values) => {
    let submittedValues = { ...values.genderRange, genderRangeType, details: {} };
    if (genderRangeType === "female") {
      submittedValues.details[selectedDetails] = true;
      if (selectedDetails === "pregnant") {
        submittedValues.details.trimester = values.genderRange.trimester;
      }
    }

    onFinish(submittedValues);
    form.resetFields();
    setIsFormVisible(false);
  };

  const handleOnChange = (key) => {
    setSelectedDetails(key)
  }

  if (!isFormVisible) {
    return null;
  }

  const femaleRecordType = selectedDetails && `(${selectedDetails})`;

  // Custom validator for Min and Max fields
  const requiredMinOrMax = ({ getFieldValue }) => ({
    validator(_, value) {
      const { min, max } = getFieldValue(['genderRange']) || {};
      if (min !== undefined || max !== undefined) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Either Min or Max is required'));
    },
  });

  return (
    <Form name="addAdvanceRangeForm" layout="vertical" form={form}>
      <div style={{ marginBottom: 16 }}>
        <h3>Add Gender Range for {genderRangeType} {femaleRecordType}</h3>
      </div>
      {genderRangeType === "female" && (
        <Space style={{ display: 'flex', marginBottom: 16 }}>
          <DetailsDropdown onChange={handleOnChange} />
        </Space>
      )}
      <Space style={{ display: 'flex', marginBottom: 8 }}>
        <Form.Item
          name={['genderRange', 'unit']}
          label="Unit"
          rules={[{ required: true, message: 'Please enter unit' }]}
        >
          <Input placeholder="Unit" />
        </Form.Item>
        <Form.Item
          name={['genderRange', 'min']}
          label="Min"
          rules={[requiredMinOrMax]}
        >
          <Input type="number" placeholder="Min" />
        </Form.Item>
        <Form.Item
          name={['genderRange', 'max']}
          label="Max"
          rules={[requiredMinOrMax]}
        >
          <Input type="number" placeholder="Max" />
        </Form.Item>
      </Space>
      <Form.Item>
        <Button type="primary" htmlType="button" onClick={() => form.validateFields().then(handleSubmit)}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const DetailsDropdown = ({ onChange }) => {
  const [selectedType, setSelectedType] = useState(null);

  const handleMenuClick = ({ key }) => {
    setSelectedType(key);
    onChange(key); // Call onChange callback with the selected key
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="menopause">Menopause</Menu.Item>
      <Menu.SubMenu key="pregnant" title="Pregnant">
        <Menu.SubMenu key="trimester" title="Trimester">
            <Menu.Item key="first">First</Menu.Item>
            <Menu.Item key="second">Second</Menu.Item>
            <Menu.Item key="third">Third</Menu.Item>
            <Menu.Item key="none">None</Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>

      <Menu.Item key="prePuberty">Pre Puberty</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} className="w-[20vw] mb-4">
      <a className="ant-dropdown-link flex" onClick={(e) => e.preventDefault()}>
        {selectedType ? selectedType.charAt(0).toUpperCase() + selectedType.slice(1) : 'Select a type'} <ArrowDownIcon className="w-5" />
      </a>
    </Dropdown>
  );
};


// import React, { useState } from 'react';
// import { StepHeader } from '@components/atoms/fileUploder/stepHeader';
// import { addTestSteps } from 'utils/static/static';
// import { SuccessTest } from '../addTest/successTest';
// import { TestDetail } from '../addTest/testDetail';
// import { AddKeywords } from '../addTest/addKeywords';


// interface AddTestComponentProps {
//   setTest: React.Dispatch<React.SetStateAction<boolean>>;
//   edit?: any; // Adjust the type based on your requirements
// }

// export const AddTestComponent: React.FC<AddTestComponentProps> = ({ setTest, edit }) => {
//   const [currentStep, setCurrentStep] = useState(addTestSteps[0]);

//   const handleSuccess = () => {
//     setTest(false);
//   };

//   const renderStepContent = () => {
//     switch (currentStep.id) {
//       case 1:
//         return <TestDetail handleSteps={() => setCurrentStep(addTestSteps[1])} />;
//       case 2:
//         return <AddKeywords handleBack={()=>{setCurrentStep(addTestSteps[0])}} handleSuccess={() => setCurrentStep(addTestSteps[2])} />;
//       case 3:
//         return <SuccessTest handleSuccess={handleSuccess} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       <div id="steps" className="rounded-md bg-slate-50 w-full p-4 sm:p-0 md:p-4 mb-4">
//         <StepHeader stepList={addTestSteps} currentStep={currentStep} />
//       </div>
//       <div className="h-auto">{renderStepContent()}</div>
//     </div>
//   );
// };