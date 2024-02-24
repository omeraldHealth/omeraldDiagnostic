import { patientDetailsForm } from "utils/types/molecules/forms.interface";
import { useProfileValue } from "@components/common/constants/recoilValues";
import { useRecoilState } from "recoil";
import { reportState } from "@components/common/recoil/report/index";
import DynamicFormGenerator from "../../common/form/dynamicForm";

interface PatientDetailsProps {
  handleSteps: () => void;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ handleSteps }) => {
  const profileValue = useProfileValue();
  const [reportValue, setReportState] = useRecoilState(reportState);

  const handleSubmit = (value: any): void => {
    setReportState(value);
    handleSteps();
  };

  return (
    <div className="p-8">
      <section className="w-[70vh] h-auto xl:h-[40vh] xl:mt-4">
        <DynamicFormGenerator formProps={patientDetailsForm(profileValue)} buttonText="Continue" handleSubmit={handleSubmit} />
      </section>
    </div>
  );
};

export { PatientDetails };
