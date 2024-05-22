import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserLayout } from '@components/templates/pageTemplate';
import { useDashboardTabs, useUserValues } from '../components/common/constants/recoilValues';
import { CheckIcon } from '@heroicons/react/20/solid';
import { useQueryGetData } from '../utils/reactQuery';
import { getDiagProfileByPhoneApi, getDiagnosticUserApi } from '../utils';
import { useSetRecoilState } from 'recoil';
import { profileState } from '../components/common/recoil/profile';
import { errorAlert, successAlert } from '../components/atoms/alerts/alert';
import { Loader } from '../components/atoms/loader/loader';
import { useUser } from '@clerk/clerk-react';
import Cookies from 'js-cookie';


const ChooseDc: React.FC = () => {
  // const userData = useUserValues();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const setDiagnosticCenter = useSetRecoilState(profileState)
  const [selectedCenterId, setSelectedCenterId] = useState<string | null>(null);
  const {data:diagnosticCenter, status} = useQueryGetData('diagnosticCenter', getDiagProfileByPhoneApi+ selectedCenterId, {enabled: !!selectedCenterId });
  const { user } = useUser();
  const userPhoneNumber = user?.phoneNumbers[0]?.phoneNumber;
  

  const { data: userData, status:State, refetch, isLoading } = useQueryGetData(
    'userData',
    getDiagnosticUserApi + userPhoneNumber,
    { enabled: !!userPhoneNumber }
  );

  useEffect(() => {
    if (!userData?.data?.diagnosticCenters) {
      router.push('/verifyUser');
    }
  }, [userData?.data, router]);



  const handleCardClick = (centerId: string) => {
    setSelectedCenterId(prevId => (prevId === centerId ? null : centerId));
  };

  const handleDCSelected = () => {
    setLoading(true);
    if (status === 'success' && diagnosticCenter?.data) {
      setDiagnosticCenter(diagnosticCenter?.data);
      Cookies.set('diagnosticCenter', JSON.stringify(diagnosticCenter?.data), { expires: 1 / 24 }); // 1 hour
      successAlert("Logging into Diagnostic Profile");
      router.push("/dashboard")
    } else {
      errorAlert("Error logging into Diagnostic Center");
    }
  
    setLoading(false);
  };
  return (
    <UserLayout tabName="Admin Omerald | Choose Diagnostic Center">
      {loading && <Loader/>}
      <section className="m-8 text-center">
        <h2 className="mt-20 font-bold text-xl text-purple-900">Choose Diagnostic Center to login</h2>
        <div className="min-h-[50vh] h-auto flex justify-center mt-20">
          <div>
            <section className="flex gap-6 text-center">
              {userData?.data?.diagnosticCenters?.map((center) => (
                <DiagnosticCard
                  key={center.diagnostic._id}
                  center={center}
                  isSelected={center.diagnostic._id === selectedCenterId}
                  handleCardClick={handleCardClick}
                />
              ))}
            </section>
            {selectedCenterId && (
              <button onClick={handleDCSelected} className="bg-green-800 h-auto text-white w-[10vw] my-20 px-2 py-2 rounded-md transition-opacity duration-2000 opacity-100">
                Proceed
              </button>
            )}
          </div>
        </div>
      </section>
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
    className={`w-[275px] ${isSelected? 'bg-gray-400':'bg-white'} h-[100px] bg-white border border-1 shadow-xl p-6 cursor-pointer transform hover:scale-105 transition-transform duration-300 ${isSelected ? 'bg-gray-300' : ''}`}
    onClick={() => handleCardClick(center.diagnostic._id)}
  >
    <div className="flex items-center">
      <CheckIcon className={`w-6 h-6 text-lg ${isSelected ? 'text-green-900' : 'text-gray-300'}`} />
      <h2 className="text-lg font-semibold text-gray-700 ml-2">
        {center.diagnostic.centerName}
      </h2>
    </div>
    <p className="text-gray-500 mt-2">
      Role: {center.branches[0]?.roleName}
    </p>
  </div>
);

export default ChooseDc;
