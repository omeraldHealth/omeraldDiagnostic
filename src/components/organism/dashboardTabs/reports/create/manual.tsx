import { reportState } from "@components/common/recoil/report";
import { reportDataState } from "@components/common/recoil/report/reportData";
import { useGetDcTest } from "@utils/reactQuery";
import { Button, Input, Space, Table, Tag, Form } from "antd";
import { useState, useMemo, useEffect } from "react";
import { FaSave, FaEdit, FaSearchMinus } from "react-icons/fa";
import { useRecoilState } from "recoil";
import EditComponents from "./compns";

const ManualReport = ({ next, handlePrevious }) => {
  const [reportData, setReportData] = useRecoilState(reportDataState);
  const [testId, setTestId] = useRecoilState(reportState);
  const { data: testSelected, refetch } = useGetDcTest({ selectedTestId: testId });
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState({}); // Track edit mode for each parameter
  const [components, setComponents] = useState(testSelected?.data?.components || []);

  useEffect(() => {
    // Sync testSelected components with local state
    if (testSelected?.data?.components) {
      setComponents(testSelected.data.components);
    }
  }, [testSelected]);

  useEffect(() => { 
    // Update the report data state
    setReportData((prevData) => ({
      ...prevData,
      parsedData: {
        ...prevData.parsedData,
        components: components,
      },
    }));
  }, [components, setReportData]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const toggleEditMode = (parameterId) => {
    setEditMode((prev) => ({
      ...prev,
      [parameterId]: !prev[parameterId],
    }));
  };

  const handleInputChange = (parameterId, rangeId, value) => {
    const updatedParameters = testSelected?.data?.parameters.map((parameter) => {
      if (parameter._id === parameterId) {
        const updatedAdvanceRange = {
          ...parameter.bioRefRange.advanceRange,
          ageRange: parameter.bioRefRange.advanceRange.ageRange.map((range) => {
            if (range._id === rangeId) {
              return { ...range, value };
            }
            return range;
          }),
          genderRange: parameter.bioRefRange.advanceRange.genderRange.map((range) => {
            if (range._id === rangeId) {
              return { ...range, value };
            }
            return range;
          }),
        };

        const updatedBasicRange = parameter.bioRefRange.basicRange.map((range) => {
          if (range._id === rangeId) {
            return { ...range, value };
          }
          return range;
        });

        return {
          ...parameter,
          bioRefRange: {
            advanceRange: updatedAdvanceRange,
            basicRange: updatedBasicRange,
          },
        };
      }
      return parameter;
    });

    // Update the report data state
    setReportData((prevData) => ({
      ...prevData,
      parsedData: {
        ...prevData.parsedData,
        parameters: updatedParameters,
      },
    }));

    // Also update the form state if needed
    form.setFieldsValue({
      [parameterId]: {
        [rangeId]: { value },
      },
    });
  };

  const saveData = (parameterId) => {
    // Get the current form values
    const formValues = form.getFieldsValue();

    const updatedParameters = testSelected?.data?.parameters.map((parameter) => {
      if (parameter._id === parameterId) {
        const updatedAdvanceRange = {
          ...parameter.bioRefRange.advanceRange,
          ageRange: parameter.bioRefRange.advanceRange.ageRange.map((range) => {
            const rangeId = range._id;
            return {
              ...range,
              value: formValues?.[parameterId]?.[rangeId]?.value || range.value,
            };
          }),
          genderRange: parameter.bioRefRange.advanceRange.genderRange.map((range) => {
            const rangeId = range._id;
            return {
              ...range,
              value: formValues?.[parameterId]?.[rangeId]?.value || range.value,
            };
          }),
        };

        const updatedBasicRange = parameter.bioRefRange.basicRange.map((range) => {
          const rangeId = range._id;
          return {
            ...range,
            value: formValues?.[parameterId]?.[rangeId]?.value || range.value,
          };
        });

        return {
          ...parameter,
          bioRefRange: {
            advanceRange: updatedAdvanceRange,
            basicRange: updatedBasicRange,
          },
        };
      }
      return parameter;
    });

    // Update the global state
    setReportData((prevData) => ({
      ...prevData,
      parsedData: {
        ...prevData.parsedData,
        parameters: updatedParameters,
      },
    }));

    // Lock the fields after saving
    toggleEditMode(parameterId);
  };

  const renderInputFields = (record) => {
    const { advanceRange, basicRange } = record.bioRefRange;

    return (
      <div className="grid grid-cols-3">
        {advanceRange?.ageRange?.map((range) => (
          <div key={range._id} className="max-w-[10vw]">
            <h4>Age: ({range.ageRangeType}):</h4>
            <Space>
              <Form.Item
                name={[record._id, range._id, "value"]}
                initialValue={range.value || ''}
              >
                <Input
                  placeholder="value"
                  value={form.getFieldValue([record._id, range._id, "value"]) || ''}
                  onChange={(e) =>
                    handleInputChange(record._id, range._id, e.target.value)
                  }
                  disabled={!editMode[record._id]} // Disable when not in edit mode
                />
              </Form.Item>
            </Space>
          </div>
        ))}
        {advanceRange?.genderRange?.map((range) => (
          <div key={range._id} className="max-w-[10vw]">
            <h4>Gender ({range.genderRangeType}):</h4>
            <Space>
              <Form.Item
                name={[record._id, range._id, "value"]}
                initialValue={range.value || ''}
              >
                <Input
                  placeholder="value"
                  value={form.getFieldValue([record._id, range._id, "value"]) || ''}
                  onChange={(e) =>
                    handleInputChange(record._id, range._id, e.target.value)
                  }
                  disabled={!editMode[record._id]} // Disable when not in edit mode
                />
              </Form.Item>
            </Space>
          </div>
        ))}
        {basicRange?.map((range) => (
          <div key={range._id} className="max-w-[10vw]">
            <h4>Basic Range:</h4>
            <Space>
              <Form.Item
                name={[record._id, range._id, "value"]}
                initialValue={range.value || ''}
              >
                <Input
                  placeholder="value"
                  value={form.getFieldValue([record._id, range._id, "value"]) || ''}
                  onChange={(e) =>
                    handleInputChange(record._id, range._id, e.target.value)
                  }
                  disabled={!editMode[record._id]} // Disable when not in edit mode
                />
              </Form.Item>
            </Space>
          </div>
        ))}
      </div>
    );
  };

  const handleSubmit = () => { 
    console.log(reportData)
    next();
  };

  const parameterColumns = useMemo(
    () => [
      {
        title: "Parameter",
        dataIndex: "name",
        key: "name",
        ellipsis: true,
        width: 150,
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (text) => <div className="truncate w-[150px]">{text}</div>,
      },
      {
        title: "Alias",
        dataIndex: "aliases",
        key: "aliases",
        width: 150,
        filterIcon: (filtered) => (
          <FaSearchMinus style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Search aliases"
              value={selectedKeys[0]}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              style={{ marginBottom: 8 }}
            />
            <Button onClick={() => clearFilters && clearFilters()}>Reset</Button>
          </div>
        ),
        onFilter: (value, record) =>
          record.aliases.some((alias) =>
            alias.toLowerCase().includes(value.toLowerCase())
          ),
        render: (aliases) => (
          <Space size={[0, 1]} wrap>
            {aliases?.map((alias) => (
              <Tag color="geekblue" key={alias}>
                {alias}
              </Tag>
            ))}
          </Space>
        ),
      },
      {
        title: "Bio Reference Values (Please Click Save to save values)",
        dataIndex: "bioRefRange",
        key: "bioRefRange",
        render: (text, record) => renderInputFields(record),
      },
      {
        title: "Actions",
        key: "actions",
        width: "50",
        render: (_, record) => (
          editMode[record._id] ? (
            <a onClick={() => saveData(record._id)}>
              <FaSave className="w-4 h-4" />
            </a>
          ) : (
            <a onClick={() => toggleEditMode(record._id)}>
              <FaEdit className="w-4 h-4" />
            </a>
          )
        ),
      },
    ],
    [testSelected, reportData, editMode]
  );

  return (
    <section className="w-[70vw] p-4 bg-white rounded-lg">
      <Form form={form}>
        <Table
          dataSource={testSelected?.data?.parameters}
          columns={parameterColumns}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
          }}
          scroll={{ x: "max-content" }}
        />
        <EditComponents 
          edit={true} 
          components={components} 
          setComponents={setComponents} 
        />
        <Button type="primary" onClick={handleSubmit}>
          Next
        </Button> 
        <Button type="default" onClick={() => {handlePrevious() }} className="mx-4">
          Previous
        </Button>
      </Form>
    </section>
  );
};

export default ManualReport;
