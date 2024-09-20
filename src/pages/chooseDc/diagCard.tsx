import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { FaCheck } from 'react-icons/fa';
import { UserInfo } from '@/utils/interface/getData';

const { Option } = Select;

interface DiagnosticCardProps {
  handleCardClick?: (value: string) => void; // Adjust if needed
  userValue?: UserInfo;
  defaultValue?: string;
}

const DiagnosticCard: React.FC<DiagnosticCardProps> = ({
  handleCardClick,
  userValue,
  defaultValue,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  useEffect(() => {
    if ((!defaultValue || defaultValue === "") &&  userValue?.diagnosticCenters && userValue?.diagnosticCenters?.length > 0) {
      const firstId = userValue.diagnosticCenters[0]?.diagnostic?._id;
      setSelectedValue(firstId);
    }
  }, [defaultValue, userValue, handleCardClick]);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    handleCardClick?.(value);
  };

  return (
    <div>
      <section>
        <Select
          className="w-[16vw] my-4"
          value={selectedValue}
          onChange={handleChange}
        >
          {userValue?.diagnosticCenters?.map((center) => (
            <Option
              key={center?.diagnostic?._id}
              value={center?.diagnostic?._id}
            >
              <div className="flex items-center justify-between">
                {center?.diagnostic?.centerName}
                {selectedValue === center?.diagnostic?._id && (
                  <FaCheck className="ml-2 text-green-500" /> // Show check icon if selected
                )}
              </div>
            </Option>
          ))}
        </Select>
      </section>
    </div>
  );
};

export default DiagnosticCard;
