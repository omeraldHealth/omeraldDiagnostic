import React, { useState } from 'react';
import { Button, Input, Select, Space, Table, Tag } from 'antd';
import { PencilIcon } from '@heroicons/react/20/solid';
import { FaSave, FaSearchMinus } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { reportDataState } from '@components/common/recoil/report/reportData';
import { toast } from 'react-toastify';
import {
  errorAlert,
  successAlert,
  warningAlert,
  warningAlert2,
} from '@components/atoms/alerts/alert';
import { success } from '@styles/styleTemplate/color';
import { useCurrentBranchValue } from '@components/common/constants/recoilValues';

const { Option } = Select;

const flattenBioRefTypes = (input) => {
  const bioRefTypes = {
    basicRange: [
      {
        key: 'basic1',
        min: 0,
        max: 100,
        unit: 'mg/dL',
        label: 'Basic Range 1',
      },
    ],
    advanceRange: {
      ageRange: [
        {
          key: 'pediatric',
          min: 0,
          max: 18,
          unit: 'years',
          label: 'Pediatric',
        },
        { key: 'adult', min: 19, max: 64, unit: 'years', label: 'Adult' },
        { key: 'senior', min: 65, max: 100, unit: 'years', label: 'Senior' },
      ],
      genderRange: [
        { key: 'male', min: 0, max: 100, unit: 'years', label: 'Male' },
        { key: 'female', min: 0, max: 100, unit: 'years', label: 'Female' },
        { key: 'other', min: 0, max: 100, unit: 'years', label: 'Other' },
      ],
    },
  };

  let options = [];

  // Handle basicRange
  if (input.basicRange && input.basicRange.length) {
    bioRefTypes.basicRange.forEach((item) => {
      input.basicRange.forEach((inputItem) => {
        if (
          item.min === inputItem.min &&
          item.max === inputItem.max &&
          item.unit === inputItem.unit
        ) {
          options.push({ ...item, group: 'Basic Range' });
        }
      });
    });
  }

  // Handle advanceRange
  if (input.advanceRange) {
    Object.keys(input.advanceRange).forEach((group) => {
      if (input.advanceRange[group] && input.advanceRange[group].length) {
        bioRefTypes.advanceRange[group].forEach((item) => {
          input.advanceRange[group].forEach((inputItem) => {
            const isMatch =
              (group === 'ageRange' &&
                item.key === inputItem.ageRangeType &&
                item.min === inputItem.min &&
                item.max === inputItem.max &&
                item.unit === inputItem.unit) ||
              (group === 'genderRange' &&
                item.key === inputItem.genderRangeType &&
                item.min === inputItem.min &&
                item.max === inputItem.max &&
                item.unit === inputItem.unit);
            if (isMatch) {
              options.push({
                ...item,
                group: `${group.charAt(0).toUpperCase() + group.slice(1)} Range`,
              });
            }
          });
        });
      }
    });
  }

  return options;
};

const BioRefDropDown = ({ record, editState, handleValueChange }) => {
  const options = flattenBioRefTypes(record?.bioRefRange);
  console.log('record', record);
  return (
    <div className="flex space-x-2">
      <Select
        className="w-1/2"
        placeholder="Select Type"
        onChange={(value) => handleValueChange('type', value)}
        defaultValue={record.bioRefRange?.value?.type}
        disabled={!editState.isEditing}
      >
        {options.map((opt) => (
          <Option key={opt.key} value={opt.key}>
            {opt.label}
          </Option>
        ))}
      </Select>
      <Input
        className="w-1/2"
        placeholder="Enter Value"
        onChange={(e) => handleValueChange('value', e.target.value)}
        defaultValue={record.bioRefRange?.value?.value}
        disabled={!editState.isEditing}
      />
    </div>
  );
};

export const ManualReport = ({ next }) => {
  const [reportData, setReportData] = useRecoilState(reportDataState);
  const [editStates, setEditStates] = useState(
    reportData?.parsedData?.parameters?.reduce((acc, param) => {
      acc[param._id] = { isEditing: true };
      return acc;
    }, {}),
  );

  const toggleEditing = (id) => {
    setEditStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isEditing: !prev[id]?.isEditing,
      },
    }));
  };

  const handleValueChange = (id, fieldName, value) => {
    setEditStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [fieldName]: value,
      },
    }));
  };

  const saveData = (id) => {
    const editedData = editStates[id]; // Get the edited data for the specific row
    const newData = reportData.parsedData.parameters.map((item) => {
      if (item._id === id) {
        // Check for matching _id
        return {
          ...item,
          bioRefRange: {
            ...item.bioRefRange,
            value: {
              ...editedData, // Assign edited data to bioRefRange.value
            },
          },
        };
      }
      return item;
    });
    setReportData({
      ...reportData,
      parsedData: {
        ...reportData.parsedData,
        parameters: newData,
      },
    });

    toggleEditing(id); // Optionally turn off editing mode after save
  };

  const parameterColumns = [
    {
      title: 'Parameter',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: 150,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => (
        <div
          style={{ width: 150, wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
        >
          {text}
        </div>
      ),
    },
    {
      title: 'Alias',
      dataIndex: 'aliases',
      key: 'aliases',
      width: 250,
      filterIcon: (filtered) => (
        <FaSearchMinus style={{ color: filtered ? '#1890ff' : undefined }} />
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
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Button onClick={() => clearFilters && clearFilters()}>Reset</Button>
        </div>
      ),
      onFilter: (value, record) =>
        record.aliases.some((alias) =>
          alias.toLowerCase().includes(value.toLowerCase()),
        ),
      render: (aliases) => (
        <Space onMouseEnter={() => {}} size={[0, 1]} wrap>
          {aliases?.map((alias) => (
            <Tag color="geekblue" key={alias}>
              {alias}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Bio Reference Values',
      dataIndex: 'bioRefValue',
      key: 'bioRefValue',
      render: (text, record) => (
        <BioRefDropDown
          record={record}
          editState={editStates[record?._id] || {}}
          handleValueChange={(fieldName, value) =>
            handleValueChange(record._id, fieldName, value)
          }
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) =>
        editStates[record._id]?.isEditing ? (
          <a onClick={() => saveData(record._id)}>
            <FaSave className="w-4 h-4" />
          </a>
        ) : (
          <a onClick={() => toggleEditing(record._id)}>
            <PencilIcon className="w-4 h-4" />
          </a>
        ),
    },
  ];

  return (
    <section className="w-[70vw] p-4 bg-white rounded-lg relative text-left">
      <Table
        dataSource={reportData?.parsedData?.parameters}
        columns={parameterColumns}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
        scroll={{ x: 'max-content' }}
      />
      <Button
        onClick={() => {
          if (checkIfValueExist(reportData?.parsedData?.parameters)) {
            successAlert('All values updated successfully');
            next();
          } else {
            warningAlert2('Please enter values for all params');
          }
        }}
        type="primary"
      >
        Next
      </Button>
    </section>
  );
};

const checkIfValueExist = (parameters) => {
  return parameters.every(
    (param) =>
      param?.bioRefRange?.value !== undefined &&
      param?.bioRefRange?.value !== null,
  );
};
