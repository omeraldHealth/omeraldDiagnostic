import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import DiagnosticCard from './diagCard';
import AddDC from './addDC';
import { useUserRecoilValue } from '@/utils/recoil/values';
import { usePersistedDCState } from '@/hooks/localstorage';
import { errorAlert } from '@/components/common/alerts';
import { PageLayout } from '@/components/layouts/pageLayout';
import { verifyProfileImage } from '@/utils/constants/cloudinary';
import { useSetRecoilState } from 'recoil';
import { createDC } from '@/utils/recoil';
import { PageLoader } from '@/components/common/pageLoader';

const ChooseDc: React.FC = () => {
  const router = useRouter();
  const userValue = useUserRecoilValue();
  const [selectedDc, setSelectedDC] = usePersistedDCState();
  const [defaultValue, setDefaultValue] = useState<string>('');
  const createDcState = useSetRecoilState(createDC);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userValue && userValue?.diagnosticCenters) {
      const firstId = userValue.diagnosticCenters[0]?.diagnostic?._id;
      if (firstId) {
        setDefaultValue(firstId);
        setLoading(false);
      } else {
        router.push('/verifyUser');
      }
    } else {
      setLoading(true); // Keep showing loader if no userValue or diagnostic centers are found
    }
  }, [userValue]);

  const handleCreateDC = () => {
    createDcState(true);
    router.push('/onboard');
  };

  const handleSelectDC = (value: string) => {
    setDefaultValue(value);
    setSelectedDC(value);
  };

  const handleSubmit = () => {
    if (defaultValue) {
      setSelectedDC(defaultValue);
      router.push('/dashboard');
    } else {
      errorAlert('Please select a Diagnostic Center to proceed.');
    }
  };

  return (
    <PageLayout
      tabDescription="Choose Diagnostic Center"
      tabName="Admin Diagnostic | Choose Diagnostic Center"
    >
      {loading && <PageLoader />}
      {!loading && userValue?.diagnosticCenters.length > 0 && (
        <section className="w-full lg:w-[60%] mx-auto my-8 p-6 bg-white shadow-xl rounded-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex justify-center">
              <img src={verifyProfileImage} alt="Verification" />
            </div>
            <div className="text-center">
              <h2 className="font-bold text-2xl text-purple-900 mb-6">
                Choose a Diagnostic Center
              </h2>
              <div className="space-y-4 text-center">
                <DiagnosticCard
                  handleCardClick={handleSelectDC}
                  userValue={userValue}
                  defaultValue={defaultValue}
                />
                <AddDC handleCardClick={handleCreateDC} />
                <div className="my-8">
                  <Button
                    className="w-full lg:w-[16vw]"
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
      )}
    </PageLayout>
  );
};

export default ChooseDc;
