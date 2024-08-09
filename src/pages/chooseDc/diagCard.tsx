import React, { useState } from 'react';
import { Button, Select } from 'antd';
import { FaCheck } from 'react-icons/fa';

const { Option } = Select;

// Define types based on the provided JSON structure
interface Diagnostic {
  _id: string;
  centerName: string;
}

interface DiagnosticCenter {
  _id: string;
  diagnostic: Diagnostic;
  branches: Array<{
    branchId: string;
    roleName: string;
    _id: string;
  }>;
}

interface UserValues {
  diagnosticCenters?: DiagnosticCenter[];
}

interface DiagnosticCardProps {
  handleCardClick?: (value: string) => void; // Adjust if needed
  userValue?: UserValues;
  defaultValue? : string;
}

const DiagnosticCard: React.FC<DiagnosticCardProps> = ({ handleCardClick, userValue, defaultValue }) => {
  return (
    <div>
      <section>
        <Select
          className="w-[20vw]"
          defaultValue={defaultValue}
          onChange={handleCardClick}
        >
          {userValue?.diagnosticCenters?.map((center) => (
            <Option key={center._id} value={center._id}>
              <div className="flex items-center">
                <FaCheck className="mr-2" />
                {center.diagnostic.centerName}
              </div>
            </Option>
          ))}
        </Select>
      </section>
    </div>
  );
};

export default DiagnosticCard;
