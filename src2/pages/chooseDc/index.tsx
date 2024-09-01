import { UserLayout } from '@components/templates/pageTemplate';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { createDC } from '@components/common/recoil/chooseDc';
import { useRouter } from 'next/router';
import { useUserValues } from '@components/common/constants/recoilValues';
import verifyProfile from '@public/verifyProfile.png';
import DiagnosticCard from './diagCard';
import AddDC from './addDC';
import { usePersistedDCState } from '@components/common/recoil/hooks/usePersistedState';
import { Button } from 'antd';
import { errorAlert } from '@components/atoms/alerts/alert';
import { Spinner } from '@chakra-ui/react';
import { unselectDcState } from '@components/common/recoil/branch/branch';

const ChooseDc: React.FC = () => {
  const router = useRouter();
  const userValue = useUserValues();
  const [selectedDc, setSelectedDC] = usePersistedDCState();
  const [defaultValue, setDefaultValue] = useState<string>('');
  const createDCRecoil = useSetRecoilState(createDC);
  const [unselectDc, setUnselectDc] = useRecoilState(unselectDcState);

  const handleSetDefaultValue = () => {
    // Redirect if user data is missing
    if (!userValue || Object.keys(userValue)?.length === 0) {
      router.push('/verifyUser');
      return;
    }

    //@ts-ignore
    const hasSingleDc = userValue?.diagnosticCenters?.length === 1;
    //@ts-ignore
    const singleDcValue = userValue?.diagnosticCenters?.[0]?.diagnostic?._id;

    if (selectedDc && selectedDc !== null) {
      setDefaultValue(selectedDc);
      if (!unselectDc) {
        handleSubmit();
      }
    } else if (hasSingleDc && singleDcValue != null) {
      setDefaultValue(singleDcValue);
      setSelectedDC(singleDcValue);
    } else if (singleDcValue != null) {
      setDefaultValue(singleDcValue);
      setSelectedDC(singleDcValue);
    } else {
      // Handle case where no valid DC is selected or available
      setDefaultValue('');
    }
  };

  const handleCreateDC = () => {
    createDCRecoil(true);
    router.push('/onboard');
  };

  const handleSelectDC = (value: string) => {
    if (value) {
      setSelectedDC(value);
      setDefaultValue(value);
    }
  };

  const handleSubmit = () => {
    if (selectedDc || defaultValue) {
      setSelectedDC(selectedDc || defaultValue);
      setUnselectDc(false);
      router.push('/dashboard');
    } else {
      errorAlert('Please select DC to proceed.');
    }
  };

  useEffect(() => {
    handleSetDefaultValue();
  }, [userValue, selectedDc]); // Add selectedDc as a dependency to ensure the effect reruns if it changes

  return (
    <UserLayout
      tabDescription="Choose DC"
      tabName="Admin Diagnostic | Choose Diagnostic Center"
    >
      <section className="w-[60%] my-8 m-auto grid grid-cols-2 shadow-xl">
        <section className="text-center">
          {verifyProfile?.src ? (
            <img src={verifyProfile.src} alt="Verification" />
          ) : (
            <Spinner />
          )}
        </section>
        <section className="text-center">
          <h2 className="mt-10 font-bold text-xl text-purple-900">
            Choose Diagnostic Center to login
          </h2>
          <div className="min-h-[50vh] h-auto flex justify-center mt-10">
            <div>
              {defaultValue && (
                <DiagnosticCard
                  defaultValue={defaultValue}
                  handleCardClick={handleSelectDC}
                  userValue={userValue}
                />
              )}
              <AddDC handleCardClick={handleCreateDC} />
              <section className="flex justify-start">
                <Button
                  className="w-[5vw]"
                  onClick={handleSubmit}
                  type="primary"
                >
                  Proceed
                </Button>
              </section>
            </div>
          </div>
        </section>
      </section>
    </UserLayout>
  );
};

export default ChooseDc;
