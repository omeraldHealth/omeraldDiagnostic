import moment from 'moment';
import QRCode from 'qrcode.react';

const PatientInfo = ({record}) => {
  return (
    <div className="mx-10 my-5 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-start border-r border-gray-400 pr-20">
          <div className="ml-4">
            <h2 className="font-semibold text-lg">{record?.patient?.name}</h2>
            <p className="text-sm">Age: {calculateAge(record?.patient?.dob)}</p>
            <p className="text-sm">Sex: {record?.patient?.gender}</p>
            <p className="text-sm">Contact: {record?.patient?.contact?.phone}</p>
            <p className="text-sm">PID: 2B2USUG5</p>
          </div>
          <div className="p-1 border-2 border-black rounded ml-8">
            <QRCode value="https://www.example.com" size={64} />
          </div>
        </div>
        <div className="flex flex-col justify-between border-r  pr-20 border-gray-400 px-4">
          <div>
            <h3 className="font-semibold text-left">Sample Collected From:</h3>
            <p className="text-sm">{record?.diagnosticCenter?.name} </p>
            <p className="text-sm">{record?.diagnosticCenter?.branch?.name} </p>
            <p className="text-sm mt-2">Ref. By: Dr. Avinash</p>
          </div>
        </div>
        <div className="flex flex-col justify-between px-4">
          {/* Placeholder for the barcode */}
          <div className="text-sm">
            <h3 className="font-semibold text-left">Report Dates:</h3>
            <p><span className='font-bold'>Report Generate Date</span>: {moment(record?.reportData?.reportDate).format('MM-DD-YYYY')}</p>
            <p><span className='font-bold'>Report Uploaded Date</span> {moment(record?.reportData?.updatedDate).format('MM-DD-YYYY')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // If this year's birthday has not occurred yet, subtract 1 from age.
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};