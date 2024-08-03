import React, { useEffect, useState } from 'react';
import { UserLayout } from '@components/templates/pageTemplate';
import { CheckIcon, PlusIcon } from '@heroicons/react/20/solid';
import { Loader } from '../components/atoms/loader/loader';
import { useSetRecoilState } from 'recoil';
import { branchState } from '@components/common/recoil/branch/branch';
import { profileState } from '@components/common/recoil/profile';
import { useRouter } from 'next/router';
import { useGetDcProfile, useGetUser } from 'utils/reactQuery';
import { useUser } from '@clerk/clerk-react';
import { getDiagProfileByPhoneApi } from '@utils';
import axios from 'axios';
import { useProfileValue } from '@components/common/constants/recoilValues';

const ChooseDc: React.FC = () => {
  const { user } = useUser();
  const dcId = localStorage?.getItem("selectedDc");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCenterId, setSelectedCenterId] = useState<string | null>(dcId);
  const setCurrentBranch = useSetRecoilState(branchState);
  const setDiagnosticCenter = useSetRecoilState(profileState);
  const userPhoneNumber = user?.phoneNumbers[0]?.phoneNumber;
  const { data: userData , isLoading} = useGetUser({ userPhoneNumber });
  const [diagnosticCenter, setDiagnosticCenterState] = useState(null);

  const fetchProfile = async (selectedId: string | null) => {
    if (selectedId) {
      const resp = await axios.get(getDiagProfileByPhoneApi + selectedId);
      if (resp.status === 200) {
        setDiagnosticCenterState(resp.data);
        setDiagnosticCenter(resp.data);
      }
    }
  };

  useEffect(()=>{
    if(!isLoading && userData && diagnosticCenter){
      setLoading(false)
    }
  },[diagnosticCenter, userData])

  useEffect(() => {
      if (dcId && dcId !== "null") {
        fetchProfile(dcId);
      }
  }, [dcId]);

  useEffect(() => {
    if (diagnosticCenter) {
      navigateDashboard(diagnosticCenter);
    } 
  }, [diagnosticCenter]);

  const navigateDashboard = (diagnosticCenter: any) => {
    setCurrentBranch(diagnosticCenter?.branches[0]);
    localStorage.setItem("selectedBranch", JSON.stringify(diagnosticCenter?.branches[0]));
    localStorage.setItem("createDC", "false");
    setLoading(false)
    router.push("/dashboard");
  };

  const handleCardClick = (centerId: string) => {
    const newCenterId = centerId === selectedCenterId ? null : centerId;
    setSelectedCenterId(newCenterId);
    localStorage.setItem("selectedDc", centerId);
    if (newCenterId) {
      fetchProfile(newCenterId);
    }
    setLoading(false);
  };

  const handleDCSelected = async () => {
    if (diagnosticCenter) {
      navigateDashboard(diagnosticCenter);
    } else {
      await fetchProfile(selectedCenterId);
    }
  };

  return (
    <UserLayout tabDescription="Choose DC" tabName="Admin Diagnostic | Choose Diagnostic Center">
      {!loading ? (
        <section className="m-8 text-center">
          <h2 className="mt-20 font-bold text-xl text-purple-900">Choose Diagnostic Center to login</h2>
          <div className="min-h-[50vh] h-auto flex justify-center mt-20">
            <div>
              <section className="grid grid-cols-4 gap-6 text-center">
                <AddDC handleCardClick={() => { localStorage.setItem("createDC", "true"); router.push("/onboard"); }} />
                {userData?.data?.diagnosticCenters?.map((center: any) => (
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
        </section>
      ) : (
        <Loader />
      )}
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

const AddDC: React.FC<any> = ({ handleCardClick }) => (
  <div
    className="w-[275px] text-center h-[100px] border border-1 shadow-xl p-6 cursor-pointer transform hover:scale-105 transition-transform duration-300"
    onClick={handleCardClick}
  >
    <div className="items-center">
      <PlusIcon className="w-6 h-6 text-lg mx-auto mb-1" />
      <h2 className="text-md font-semibold text-gray-700 ml-2">
        Add New Diagnostic Center
      </h2>
    </div>
  </div>
);

export default ChooseDc;
