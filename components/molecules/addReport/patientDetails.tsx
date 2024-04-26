import { patientDetailsForm } from "utils/types/molecules/forms.interface";
import { useProfileValue, useReportValue } from "@components/common/constants/recoilValues";
import { useRecoilState } from "recoil";
import { reportState } from "@components/common/recoil/report/index";
import DynamicFormGenerator from "../../common/form/dynamicForm";
import { useEffect, useState } from "react";
import _, { isObject } from "lodash";
import { useQueryGetData } from "utils/reactQuery";
import { getAdminReportTypesApi } from "@utils";
import { errorAlert } from "@components/atoms/alerts/alert";
import axios from "axios";

interface PatientDetailsProps {
  handleSteps: () => void;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ handleSteps }) => {
  const profileValue = useProfileValue();
  const [reportValue, setReportState] = useRecoilState(reportState);
  const [selectedValue, setSelectedValue] = useState();
  const reportType = useQueryGetData('reportTypes', getAdminReportTypesApi);
  const [reportList, setReportList] = useState<any[]>(reportType.data?.data || []);
  const [testName,setTestName] = useState("")

  const handleSubmit = (value: any): void => {
    if(isObject(value)){
      value = {...value, "testName":testName}
      setReportState(value);
      handleSteps();
    }else{
      const testName = reportList?.filter((report:any) => report?._id === value)[0]?.name
      setTestName(testName)
    }
  };

  const handleSearch = _.debounce(async (value: string) => {
    try {
      if (reportList.length > 0) {
        const lowercasedValue = value.toLowerCase();

        let filtered = reportList.filter((item) => item.name?.toLowerCase().includes(lowercasedValue));
        setSelectedValue(filtered);
      } else {
        const response = await axios.get(getAdminReportTypesApi);
        const reports = response.data;

        if (response.status === 200) {
          setReportList(reports);
        } else {
          errorAlert("Error fetching report list");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      errorAlert("An error occurred while searching");
    }
  }, 50);

    // Additional useEffect to handle cleanup of debounce function
    useEffect(() => {
      return () => handleSearch.cancel();
    }, [handleSearch]);  
  

  return (
    <div className="p-8 h-auto">
      <section className="w-[70vh] h-auto xl:min-h-[40vh] xl:mt-4">
        <DynamicFormGenerator 
          formProps={patientDetailsForm(profileValue)} 
          handleSearch={handleSearch}
          selectedValue={selectedValue}
          buttonText="Continue" handleSubmit={handleSubmit} />
      </section>
    </div>
  );
};

export { PatientDetails };
