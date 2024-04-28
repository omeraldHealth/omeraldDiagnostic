// // components/LabReportTable.js
// const labData = [
//   { label: "Primary Sample Type:", result: "Blood", reference: "", unit: "" },
//   { label: "Hemoglobin (Hb)", result: "12.5", reference: "13.0 - 17.0", unit: "g/dL", note: "Low" },
//   { label: "RBC Count", result: "5.2", reference: "4.5 - 5.5", unit: "mill/cumm" },
//   { label: "PCV", result: "57.5", reference: "40 - 50", unit: "%", note: "High" },
//   { label: "MCV", result: "87.5", reference: "83 - 101", unit: "fL" },
//   { label: "MCH", result: "32.8", reference: "27 - 32", unit: "pg" },
//   { label: "MCHC", result: "32.8", reference: "32.5 - 34.5", unit: "g/dL" },
//   { label: "RDW", result: "13.6", reference: "11.6 - 14.0", unit: "%" },
//   { label: "WBC Count", result: "9000", reference: "4000-11000", unit: "cumm" },
//   { label: "Platelet Count", result: "150000", reference: "150000 - 410000", unit: "cumm", note: "Borderline" },
//   { label: "ESR", result: "5", reference: "0 - 15", unit: "mm/hr" },
//   // ... add other data similarly
// ];

// const LabReportTable = ({report}) => {
//   console.log("labRe", report?.reportData?.parsedData)

//   return (
//     <div className="overflow-x-auto p-5">
//       <table className="min-w-full border-collapse text-sm">
//         <thead>
//           <tr className="border-b">
//             <th className="text-left p-2">Investigation</th>
//             <th className="text-left p-2">Result</th>
//             <th className="text-left p-2">Reference Value</th>
//             <th className="text-left p-2">Unit</th>
//           </tr>
//         </thead>
//         <tbody>
//           {report?.reportData?.parsedData?.map((data, index) => (
//             <section>
//                <tr key={index} className="border-b text-left">
//                   <td className="p-2 font-semibold text-md">{data.testName}</td>
//                 </tr>
//                 {
//                   data?.parameters?.map((param)=>{
//                     return   <tr key={index} className="border-b text-left">
//                     <td className="p-2 text-md">{param?.name}</td>
//                     <td className="p-2 text-md">{param?.bioRefRange?.value?.value}</td>
//                     <td className="p-2 text-md">{param?.bioRefRange?.basicRange[0]?.min} - {param?.bioRefRange?.basicRange[0]?.max}  </td>
//                     <td className="p-2 text-md">{param?.bioRefRange?.basicRange[0]?.unit}  </td>
//                   </tr>
//                   })
//                 }
              
//             </section>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default LabReportTable;


// components/LabReportTable.js
import React, { Fragment } from 'react';

// const labData = [
//   { label: "Primary Sample Type:", result: "Blood", reference: "", unit: "" },
//   { label: "Hemoglobin (Hb)", result: "12.5", reference: "13.0 - 17.0", unit: "g/dL", note: "Low" },
//   { label: "RBC Count", result: "5.2", reference: "4.5 - 5.5", unit: "mill/cumm" },
//   { label: "PCV", result: "57.5", reference: "40 - 50", unit: "%", note: "High" },
//   { label: "MCV", result: "87.5", reference: "83 - 101", unit: "fL" },
//   { label: "MCH", result: "32.8", reference: "27 - 32", unit: "pg" },
//   { label: "MCHC", result: "32.8", reference: "32.5 - 34.5", unit: "g/dL" },
//   { label: "RDW", result: "13.6", reference: "11.6 - 14.0", unit: "%" },
//   { label: "WBC Count", result: "9000", reference: "4000-11000", unit: "cumm" },
//   { label: "Platelet Count", result: "150000", reference: "150000 - 410000", unit: "cumm", note: "Borderline" },
//   { label: "ESR", result: "5", reference: "0 - 15", unit: "mm/hr" },
//   // ... add other data similarly
// ];

const LabReportTable = ({ report }) => {
  // Function to determine if value is out of range
  const isOutOfRange = (value, min, max) => {
    // Convert value to number if it's not already, and check if it's outside the range
    const numericValue = Number(value);
    return numericValue < min || numericValue > max;
  };

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
          {report?.reportData?.parsedData?.map((data, index) => (
            <React.Fragment key={index}>
              <tr className="border-b text-left">
                <td colSpan="4" className="p-2 font-semibold text-md">{data.testName}</td>
              </tr>
              {data?.parameters?.map((param, paramIndex) => {
                // Check if the value is out of range to apply red text style
                const outOfRangeStyle = isOutOfRange(
                  param?.bioRefRange?.value?.value,
                  param?.bioRefRange?.basicRange[0]?.min,
                  param?.bioRefRange?.basicRange[0]?.max
                ) ? 'text-red-500 font-bold' : '';

                return (
                  <tr key={paramIndex} className="border-b text-left">
                    <td className="p-2 text-md">{param?.name}</td>
                    <td className={`p-2 text-md ${outOfRangeStyle}`}>
                      {param?.bioRefRange?.value?.value}
                    </td>
                    <td className="p-2 text-md"> 
                      {param?.bioRefRange?.basicRange[0]?.min} - {param?.bioRefRange?.basicRange[0]?.max}
                    </td>
                    <td className="p-2 text-md">{param?.bioRefRange?.basicRange[0]?.unit}</td>
                  </tr>
                );
              })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default LabReportTable;
