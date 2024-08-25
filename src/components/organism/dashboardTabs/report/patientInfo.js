import moment from "moment";
import { useCurrentBranchValue, useProfileValue } from "../../../common/constants/recoilValues";
// import QRCode from "qrcode.react";

// Function to get patient details or return a dummy object
const getPatient = (record) => {
  return (
    record?.patient || {
      name: "John Doe",
      dob: "01-01-1970",
      gender: "Unknown",
      contact: { phone: "000-000-0000" },
      pid: "DUMMY123",
    }
  );
};

const PatientInfo = ({ record }) => {
  const patient = getPatient(record);
  const currentBranch = useCurrentBranchValue()
  const currentProfile = useProfileValue()

  return (
    <div className="mx-10 my-5 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-start border-r border-gray-400 pr-20">
          <div className="ml-4">
            <h2 className="font-semibold text-lg">{patient.name}</h2>
            <p className="text-sm">Age: {calculateAge(patient.dob)}</p>
            <p className="text-sm">Sex: {patient.gender}</p>
            <p className="text-sm">Contact: {patient.contact.phone}</p>
            <p className="text-sm">PID: {patient.pid}</p>
          </div>
          {/* <div className="p-1 border-2 border-black rounded ml-8"> */}
            {/* <QRCode value="https://www.example.com" size={64} /> */}
          {/* </div> */}
        </div>
        <div className="flex flex-col justify-between border-r pr-20 border-gray-400 px-4">
          <div>
            <h3 className="font-semibold text-left">Sample Collected From:</h3>
            <p className="text-sm">{record?.diagnosticCenter?.name || currentProfile?.centerName}</p>
            <p className="text-sm">{record?.diagnosticCenter?.branch?.name || currentBranch?.branchName}</p>
            <p className="text-sm mt-2">
              Pathologist: {record?.pathologist?.name || "N/A"}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between px-4">
          {/* Placeholder for the barcode */}
          <div className="text-sm">
            <h3 className="font-semibold text-left">Report Dates:</h3>
            <p>
              <span className="font-bold">Report Generate Date:</span>{" "}
              {moment(record?.reportData?.reportDate).format("MM-DD-YYYY") || "N/A"}
            </p>
            <p>
              <span className="font-bold">Report Uploaded Date:</span>{" "}
              {moment(record?.reportData?.updatedDate).format("MM-DD-YYYY") || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;

const calculateAge = (dob) => {
  if (!dob) return "N/A";
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // If this year's birthday has not occurred yet, subtract 1 from age.
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
