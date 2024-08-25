import React from "react";

const LabReportTable = ({ report }) => {
  // Function to determine if value is out of range
  const isOutOfRange = (value, min, max) => {
    // Convert value to number if it's not already, and check if it's outside the range
    const numericValue = Number(value);
    return numericValue < min || numericValue > max;
  };
  console.log(report)
  return (
    <div className="overflow-x-auto p-5">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Investigation</th>
            <th className="text-left p-2">Result</th>
            <th className="text-left p-2">Reference Value</th>
            <th className="text-left p-2">Unit</th>
          </tr>
        </thead>
        <tbody>
          {/* {report?.reportData?.parsedData?.map((data, index) => ( */}
            <React.Fragment>
              {/* <tr className="border-b text-left">
                <td colSpan="4" className="p-2 font-semibold text-md">
                  {data.testName}
                </td>
              </tr> */}
              {report?.reportData?.parsedData?.parameters?.map((param, paramIndex) => {
                // Check if the value is out of range to apply red text style
                const outOfRangeStyle = isOutOfRange(
                  param?.bioRefRange?.value?.value,
                  param?.bioRefRange?.basicRange[0]?.min,
                  param?.bioRefRange?.basicRange[0]?.max,
                )
                  ? "text-red-500 font-bold"
                  : "";

                return (
                  <tr key={paramIndex} className="border-b text-left">
                    <td className="p-2 text-md">{param?.name}</td>
                    <td className={`p-2 text-md ${outOfRangeStyle}`}>
                      {param?.bioRefRange?.value?.value}
                    </td>
                    <td className="p-2 text-md">
                      {param?.bioRefRange?.basicRange[0]?.min} -{" "}
                      {param?.bioRefRange?.basicRange[0]?.max}
                    </td>
                    <td className="p-2 text-md">
                      {param?.bioRefRange?.basicRange[0]?.unit}
                    </td>
                  </tr>
                );
              })}
            </React.Fragment>
          {/* ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default LabReportTable;
