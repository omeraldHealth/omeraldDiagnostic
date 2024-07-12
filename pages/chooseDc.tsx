import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserLayout } from '@components/templates/pageTemplate';
import { CheckIcon, HomeIcon, PlusCircleIcon, PlusIcon } from '@heroicons/react/20/solid';
import { useQueryGetData } from '../utils/reactQuery';
import { getDiagProfileByPhoneApi, getDiagnosticUserApi } from '../utils';
import { useSetRecoilState } from 'recoil';
import { profileState } from '../components/common/recoil/profile';
import { errorAlert, successAlert, warningAlert2 } from '../components/atoms/alerts/alert';
import { Loader } from '../components/atoms/loader/loader';
import { useUser } from '@clerk/clerk-react';
import { useActivityLogger, useCurrentBranch } from '@components/common/logger.tsx/activity';
import { branchState } from '@components/common/recoil/branch/branch';


const ChooseDc: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const setDiagnosticCenter = useSetRecoilState(profileState);
  const setCurrentBranch = useSetRecoilState(branchState);
  const [selectedCenterId, setSelectedCenterId] = useState<string | null>(null);
  const userPhoneNumber = user?.phoneNumbers[0]?.phoneNumber;
  const { logActivity } = useActivityLogger();

  const { data: userData, status: userStatus } = useQueryGetData(
    'userData',
    getDiagnosticUserApi + userPhoneNumber,
    { enabled: !!userPhoneNumber }
  );

  const { data: diagnosticCenter, status: centerStatus, refetch } = useQueryGetData(
    'diagnosticCenter',
    getDiagProfileByPhoneApi + selectedCenterId,
    { enabled: !!selectedCenterId }
  );


  useEffect(() => {
    if (userStatus === 'success' && !userData?.data?.diagnosticCenters) {
      router.push('/verifyUser');
    }
    setLoading(false)
  }, [userStatus, userData, router]);

  useEffect(() => {
    if (centerStatus === 'success' && !diagnosticCenter?.data) {
      setCurrentBranch(diagnosticCenter?.branches[0])
      localStorage?.setItem("selectedBranch", JSON.stringify(diagnosticCenter?.branches[0]))
    }
    setLoading(false)
  }, [centerStatus, diagnosticCenter]);

  useEffect(()=>{refetch()},[selectedCenterId])

  const handleCardClick = (centerId: string) => {
    setSelectedCenterId(prevId => (prevId === centerId ? null : centerId));
    localStorage.setItem("selectedDc", centerId)   
  };

  const handleDCSelected = async () => {
    setLoading(true);
    if (centerStatus === 'success' && diagnosticCenter?.data) {
      setDiagnosticCenter(diagnosticCenter.data);
      setCurrentBranch(diagnosticCenter.data?.branches[0])
      localStorage.setItem('diagnosticCenter', JSON.stringify(diagnosticCenter.data), { expires: 1 / 24 });
      localStorage.setItem('selectedBranch', JSON.stringify(diagnosticCenter.data?.branches[0]), { expires: 1 / 24 });
      warningAlert2("Logging into " +diagnosticCenter?.data?.centerName);
      // logActivity("Saif Logged in")
      localStorage.setItem("createDC", "false")
      router.push("/dashboard");
    } else {
      errorAlert("Error logging into Diagnostic Center");
    }
    setLoading(false);
  };

  return (
    <UserLayout tabDescription='Choose DC' tabName="Admin Diagnostic | Choose Diagnostic Center">
      {!loading ? 
      <section className="m-8 text-center">
        <h2 className="mt-20 font-bold text-xl text-purple-900">Choose Diagnostic Center to login</h2>
        <div className="min-h-[50vh] h-auto flex justify-center mt-20">
          <div>
            <section className="grid grid-cols-4  gap-6 text-center">
              <AddDC handleCardClick={()=>{
                localStorage.setItem("createDC", "true")
                router.push("/onboard")}}/>
              {userData?.data?.diagnosticCenters?.map((center) => (
                <DiagnosticCard
                  key={center?.diagnostic?._id}
                  center={center}
                  isSelected={center?.diagnostic?._id === selectedCenterId}
                  handleCardClick={handleCardClick}
                />
              ))}
            </section>
            {selectedCenterId && (
              <button
                onClick={handleDCSelected}
                className="bg-green-800 h-auto text-white w-[10vw] my-20 px-2 py-2 rounded-md transition-opacity duration-2000 opacity-100"
              >
                Proceed
              </button>
            )}
          </div>
        </div>
      </section>:<Loader />}
    </UserLayout>
  );
};

interface DiagnosticCardProps {
  center: {
    diagnostic: {
      _id: string;
      centerName: string;
    };
    branches: {
      branchId: string;
      roleName: string;
    }[];
  };
  isSelected: boolean;
  handleCardClick: (centerId: string) => void;
}

const DiagnosticCard: React.FC<DiagnosticCardProps> = ({ center, isSelected, handleCardClick }) => (
  <div
    className={`w-[275px] h-[100px] border border-1 shadow-xl p-6 cursor-pointer transform hover:scale-105 transition-transform duration-300 ${isSelected ? 'bg-gray-300' : 'bg-white'}`}
    onClick={() => handleCardClick(center?.diagnostic?._id)}
  >
    <div className="flex items-center">
      <CheckIcon className={`w-6 h-6 text-lg ${isSelected ? 'text-green-900' : 'text-gray-300'}`} />
      <h2 className="text-lg font-semibold text-gray-700 ml-2">
        {center?.diagnostic?.centerName}
      </h2>
    </div>
    <p className="text-gray-500 mt-2">
      Role: {center?.branches[0]?.roleName}
    </p>
  </div>
);

const AddDC: React.FC<any> = ({handleCardClick,isSelected}) => (
  <div
    className={`w-[275px] text-center h-[100px] border border-1 shadow-xl p-6 cursor-pointer transform hover:scale-105 transition-transform duration-300`}
    onClick={handleCardClick}
  >
    <div className="items-center">
      <PlusIcon className={`w-6 h-6 text-lg mx-auto mb-1`} />
      <h2 className="text-md font-semibold text-gray-700 ml-2">
        Add New Diagnostic Center
      </h2>
    </div>
  </div>
);

export default ChooseDc;
