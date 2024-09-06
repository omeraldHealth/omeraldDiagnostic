import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Spin } from 'antd';
// import verifyProfile from '@public/verifyProfile.png';
import DiagnosticCard from './diagCard';
import AddDC from './addDC';
import { useUserRecoilValue } from '@/utils/recoil/values';
import { usePersistedDCState } from '@/hooks/localstorage';
import { errorAlert } from '@/components/common/alerts';

const ChooseDc: React.FC = () => {
  const router = useRouter();
  const userValue = useUserRecoilValue();
  const [selectedDc, setSelectedDC] = usePersistedDCState();
  const [defaultValue, setDefaultValue] = useState<string>('');

  useEffect(() => {
    if (!userValue || Object.keys(userValue)?.length === 0) {
      router.push('/verifyUser');
      return;
    }

    const diagnosticCenters = userValue?.diagnosticCenters || [];
    const singleDc = diagnosticCenters.length === 1 ? diagnosticCenters[0]?.diagnostic?._id : null;

    // if (selectedDc) {
    //   setDefaultValue(selectedDc);
    //   if (!unselectDc) handleSubmit();
    // } else if (singleDc) {
    //   setDefaultValue(singleDc);
    //   setSelectedDC(singleDc);
    // } else {
    //   setDefaultValue('');
    // }
  }, [userValue, selectedDc]);

  const handleCreateDC = () => {
    // setCreateDCRecoil(true);
    router.push('/onboard');
  };

  const handleSelectDC = (value: string) => {
    setSelectedDC(value);
    setDefaultValue(value);
  };

  const handleSubmit = () => {
    if (defaultValue) {
      setSelectedDC(defaultValue);
      setUnselectDc(false);
      router.push('/dashboard');
    } else {
      errorAlert('Please select a Diagnostic Center to proceed.');
    }
  };

  return (
    <UserLayout
      tabDescription="Choose Diagnostic Center"
      tabName="Admin Diagnostic | Choose Diagnostic Center"
    >
      <section className="w-full lg:w-3/5 mx-auto my-8 p-6 bg-white shadow-xl rounded-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex justify-center">
            {/* {verifyProfile?.src ? (
              <img src={verifyProfile.src} alt="Verification" className="w-full max-w-xs" />
            ) : (
              <Spin />
            )} */}
          </div>
          <div className="text-center">
            <h2 className="font-bold text-2xl text-purple-900 mb-6">
              Choose a Diagnostic Center
            </h2>
            <div className="space-y-4">
              {userValue?.diagnosticCenters?.map((center) => (
                <DiagnosticCard
                  key={center.diagnostic._id}
                  defaultValue={defaultValue}
                  handleCardClick={handleSelectDC}
                  userValue={userValue}
                />
              ))}
              <AddDC handleCardClick={handleCreateDC} />
              <div className="mt-6">
                <Button
                  className="w-full lg:w-1/2"
                  onClick={handleSubmit}
                  type="primary"
                  style={{ backgroundColor: 'green', borderColor: 'green' }}
                >
                  Proceed
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default ChooseDc;
