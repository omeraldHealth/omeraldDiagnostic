import { useUser } from '@clerk/clerk-react';
import { getDiagnosticUserApi } from '@utils/index';
import { Button, Steps } from 'antd';
import {
  useCreateDiagnostic,
  useCreateDiagnosticBranch,
  useGetUser,
  useInvalidateQuery,
  useQueryGetData,
  useUpdateUser,
} from '@utils/reactQuery';
import { successAlert, warningAlert } from '@components/atoms/alerts/alert';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { OnboardingForm } from './onboardForm';
import { OnboardingSummary } from './summary';
import { useUserValues } from '@components/common/constants/recoilValues';
import { userState } from '@components/common/recoil/user';
import { useSetRecoilState } from 'recoil';
import {
  usePersistedBranchState,
  usePersistedDCState,
} from '@components/common/recoil/hooks/usePersistedState';

const OnboardNewComponents: React.FC = () => {
  const [formData, setFormData] = useState({});
  const [current, setCurrent] = useState(0);
  const { user } = useUser();
  const router = useRouter();
  const userPhoneNumber = user?.phoneNumbers[0]?.phoneNumber;

  const {
    data: userData,
    refetch,
    isLoading,
  } = useGetUser({ userPhoneNumber: userPhoneNumber });

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);
  const invalidateQuery = useInvalidateQuery();
  const setUserRecoil = useSetRecoilState(userState);
  const [selectedDc, setSelectedDc] = usePersistedDCState();
  const [selectedBranch, setSelectedBranch] = usePersistedBranchState();
  const userValue = useUserValues();

  const updateUser = useUpdateUser({
    onSuccess: (resp) => {
      successAlert('User Updated Succesfully');
      refetch();
      if (!isLoading && resp?.data?._id) {
        setUserRecoil(resp?.data);
        invalidateQuery('userData');
        invalidateQuery('diagnosticCenter');
        router.push('/chooseDc');
      }
    },
    onError: (err) => {
      warningAlert('Error updating user' + err);
    },
  });

  const createDiagProfile = useCreateDiagnostic({
    onSuccess: (data) => {
      if (data?.status === 201 && data?.data?._id) {
        successAlert('Profile Created Succesfully');
        const newDiagnosticCenters = {
          diagnostic: data?.data?._id,
          branches: [
            {
              branchId: data?.data?.branches[0]?._id,
              roleName: 'owner',
            },
          ],
        };
        const updatedDC = [
          ...userData?.data?.diagnosticCenters,
          newDiagnosticCenters,
        ];
        updateUser.mutate({
          data: { diagnosticCenters: updatedDC },
          recordId: userValue._id,
        });
      }
    },
    onError: (err) => {
      warningAlert('Error creating profile' + err.message);
    },
  });

  const createDiagBranch = useCreateDiagnosticBranch({});

  const handleSubmit = () => {
    setSelectedDc(null);
    setSelectedBranch(null);
    const branchDetails = {
      branchName: formData?.branchName,
      branchContact: formData?.branchContact,
      branchAddress: formData?.branchAddress,
      branchEmail: formData?.branchEmail,
    };

    if (branchDetails) {
      createDiagBranch?.mutate(
        { data: branchDetails },
        {
          onSuccess: (resp) => {
            if (resp?.status === 201) {
              const centerDetails = {
                branches: [resp?.data?._id],
                centerName: formData?.centerName,
                email: formData?.email,
                phoneNumber: formData?.phoneNumber,
                ownerId: userData?.data?._id,
                brandingInfo: {
                  logoUrl: formData?.brandLogo || null,
                },
              };

              createDiagProfile.mutate({ data: centerDetails });
            }
          },
        },
      );
    }
  };

  const steps = [
    {
      title: 'Diagnostic Details',
      content: (
        <div className="min-h-[40vh] w-full">
          <OnboardingForm
            formData={formData}
            setFormData={setFormData}
            next={next}
          />
        </div>
      ),
    },
    {
      title: 'Summary',
      content: (
        <div className="min-h-[40vh]">
          <OnboardingSummary formData={formData} />
        </div>
      ),
    },
  ];

  return (
    <div className="w-[100%]">
      <Steps current={current}>
        {steps.map((item) => (
          <Steps key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="mt-5">{steps[current].content}</div>
      <div>
        {current === 1 && (
          <Button type="primary" onClick={prev} className="ml-5">
            Previous
          </Button>
        )}
        {current === 1 && (
          <Button type="dashed" onClick={handleSubmit} className="ml-5">
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnboardNewComponents;
