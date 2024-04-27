import React, { useState } from 'react';
import { Button, Input, Select, Space, Table, Tag } from 'antd';
import { PencilIcon } from '@heroicons/react/20/solid';
import { FaSave, FaSearchMinus } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { reportDataState } from '@components/common/recoil/report/reportData';

const { Option } = Select;

const flattenBioRefTypes = () => {
  const bioRefTypes = {
    basicRange: [
      { key: 'basic1', min: 0, max: 100, unit: 'mg/dL', label: 'Basic Range 1' },
    ],
    advanceRange: {
      ageRange: [
        { key: 'pediatric', min: 0, max: 18, unit: 'years', label: 'Pediatric' },
        { key: 'adult', min: 19, max: 64, unit: 'years', label: 'Adult' },
        { key: 'senior', min: 65, max: 100, unit: 'years', label: 'Senior' }
      ],
      genderRange: [
        { key: 'male', min: 0, max: 100, unit: 'years', label: 'Male' },
        { key: 'female', min: 0, max: 100, unit: 'years', label: 'Female' },
        { key: 'other', min: 0, max: 100, unit: 'years', label: 'Other' }
      ]
    }
  };

  let options = [];
  bioRefTypes.basicRange.forEach(item => {
    options.push({ ...item, group: 'Basic Range' });
  });
  Object.keys(bioRefTypes.advanceRange).forEach(group => {
    bioRefTypes.advanceRange[group].forEach(item => {
      options.push({ ...item, group: `${group.charAt(0).toUpperCase() + group.slice(1)} Range` });
    });
  });
  return options;
};

const BioRefDropDown = ({ record, editState, handleValueChange }) => {
  const options = flattenBioRefTypes();
  return (
    <div className="flex space-x-2">
      <Select
        className="w-1/2"
        placeholder="Select Type"
        onChange={(value) => handleValueChange('type', value)}
        value={editState.type || record.bioRefValue?.type}
        disabled={!editState.isEditing}
      >
        {options.map(opt => (
          <Option key={opt.key} value={opt.key}>{opt.label}</Option>
        ))}
      </Select>
      <Input
        className="w-1/2"
        placeholder="Enter Value"
        onChange={e => handleValueChange('value', e.target.value)}
        value={editState.value || record.bioRefValue?.value}
        disabled={!editState.isEditing}
      />
    </div>
  );
};

export const ManualReport = ({ next }) => {
    const [reportData, setReportData] = useRecoilState(reportDataState);
    const [editStates, setEditStates] = useState({});


  const toggleEditing = (key) => {
    const isEditing = editStates[key]?.isEditing;
    setEditStates(prev => ({
      ...prev,
      [key]: { ...prev[key], isEditing: !isEditing }
    }));
  };

  const handleValueChange = (key, fieldName, value) => {
    setEditStates(prev => ({
      ...prev,
      [key]: { ...prev[key], [fieldName]: value }
    }));
  };

  const saveData = (key) => {
    const editedData = editStates[key];
    const newData = reportData.parsedData.parameters.map(item => {
      if (item.key === key) {
        return { ...item, ...editedData, isEditing: false };
      }
      return item;
    });
    setReportData({ ...reportData, parsedData: { ...reportData.parsedData, parameters: newData } });
    toggleEditing(key);
  };
  

  const parameterColumns = [
    {
      title: 'Parameter',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: 150,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: text => <div style={{ width: 150, wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{text}</div>,
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
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Button onClick={() => clearFilters && clearFilters()}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.aliases.some(alias => alias.toLowerCase().includes(value.toLowerCase())),
      render: aliases => (
        <Space onMouseEnter={() => {}} size={[0, 1]} wrap>
          {aliases?.map(alias => (
            <Tag color="geekblue" key={alias}>{alias}</Tag>
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
          editState={editStates[record.key] || {}}
          handleValueChange={(fieldName, value) => handleValueChange(record.key, fieldName, value)}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        editStates[record.key]?.isEditing ? (
          <a onClick={() => saveData(record.key)}>
            <FaSave className="w-4 h-4" />
          </a>
        ) : (
          <a onClick={() => toggleEditing(record.key)}>
            <PencilIcon className="w-4 h-4" />
          </a>
        )
      ),
    }
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
    </section>
  );
};
