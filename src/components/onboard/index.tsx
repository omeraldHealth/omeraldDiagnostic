//@ts-nocheck
import React, { useState } from 'react';
import {
  usePersistedBranchState,
  usePersistedDCState,
} from '@/hooks/localstorage';
import {
  useCreateDiagnostic,
  useCreateDiagnosticBranch,
} from '@/utils/query/createQueries';
import { useGetUser, useInvalidateQuery } from '@/utils/query/getQueries';
import { userDataState } from '@/utils/recoil';
import { useUserRecoilValue } from '@/utils/recoil/values';
import { useUser } from '@clerk/clerk-react';
import { Button, Steps } from 'antd';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { errorAlert, successAlert, warningAlert } from '../common/alerts';
import { useUpdateUser } from '@/utils/query/updateQueries';
import { OnboardingForm } from './onboardingForm';
import { OnboardingSummary } from './onboardSummary';

interface FormData {
  branchName?: string;
  branchContact?: string;
  branchAddress?: string;
  branchEmail?: string;
  centerName?: string;
  email?: string;
  phoneNumber?: string;
  brandLogo?: string | null;
}

const OnboardNewComponents: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [current, setCurrent] = useState<number>(0);
  const { user } = useUser();
  const router = useRouter();
  const userPhoneNumber = user?.phoneNumbers?.[0]?.phoneNumber || '';

  const {
    data: userData,
    refetch,
    isLoading,
  } = useGetUser({ userPhoneNumber });

  const next = () => setCurrent((prev) => prev + 1);
  const prev = () => setCurrent((prev) => prev - 1);
  const invalidateQuery = useInvalidateQuery();
  const setUserRecoil = useSetRecoilState(userDataState);
  const [selectedDc, setSelectedDc] = usePersistedDCState();
  const [selectedBranch, setSelectedBranch] = usePersistedBranchState();

  const userValue = useRecoilValue(userDataState);
  const createDiagBranch = useCreateDiagnosticBranch({});
  const updateUser = useUpdateUser({
    onSuccess: (resp) => {
      successAlert('User Updated Successfully');
      refetch();
      if (!isLoading && resp?.data?._id) {
        setUserRecoil(resp?.data);
        invalidateQuery('userData');
        invalidateQuery('diagnosticCenter');
        router.push('/chooseDc');
      }
    },
    onError: (err) => {
      warningAlert('Error updating user: ' + err);
    },
  });

  const createDiagProfile = useCreateDiagnostic({
    onSuccess: (data) => {
      if (data?.status === 201 && data?.data?._id) {
        successAlert('Profile Created Successfully');
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
          ...(userData?.data?.diagnosticCenters || []),
          newDiagnosticCenters,
        ];
        updateUser.mutate({
          data: { diagnosticCenters: updatedDC },
          recordId: userValue._id,
        });
      }
    },
    onError: (err) => {
      warningAlert('Error creating profile: ' + err.message);
    },
  });

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
        { ...branchDetails },
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

              createDiagProfile.mutate({ ...centerDetails });
            }
          },
          onError: (err) => {
            errorAlert('Error creating DC');
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
          <Steps.Step key={item.title} title={item.title} />
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
