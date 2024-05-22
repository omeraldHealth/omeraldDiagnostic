import { useUser } from '@clerk/clerk-react';
import { errorAlert, successAlert, warningAlert } from '@components/atoms/alerts/alert';
import { Loader } from '@components/atoms/loader/loader';
import { UserLayout } from '@components/templates/pageTemplate';
import { getDiagProfileByPhoneApi, getDiagnosticUserApi } from '@utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useCreateUser, useGetDcProfile, useGetUser } from 'utils/reactQuery';
import { userState } from '../components/common/recoil/user';
import { profileState } from '@components/common/recoil/profile';

const VerifyUser = () => {
  let selectedCenterId = localStorage.getItem("selectedDc") ?? {};
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const setUserData = useSetRecoilState(userState);
  const setDiagnosticCenter = useSetRecoilState(profileState);
  // const dcData = JSON.parse(localStorage.getItem('diagnosticCenter') || '{}');
  const userPhoneNumber = user?.phoneNumbers[0]?.phoneNumber;
  const userName = user?.fullName;
  
  const { data: diagnosticCenter, status: centerStatus } = useGetDcProfile(selectedCenterId)
  const { data: userData, status, refetch, isLoading } = useGetUser({userPhoneNumber})
  

  useEffect(() => {
    if (centerStatus === 'success' && diagnosticCenter?.data) {
      setDiagnosticCenter(diagnosticCenter?.data)
    }
  }, [centerStatus, diagnosticCenter]);
  
  const createUser = useCreateUser({
    onSuccess: () => {
      successAlert("Created User");
      fetchUserData();
    },
    onError: () => {
      errorAlert("Error Creating User");
      setLoading(false);
    }
  });

  const fetchUserData = async () => {
    const result = await refetch();
    if (result.status === 'success' && result.data) {
      handleUserData(result.data);
    } else {
      errorAlert("User Not Found");
      setLoading(false);
    }
  };

  const handleUserData = (data:any) => {
    if (data && data.data && !isLoading) {
      const diagnosticCenters = data.data?.diagnosticCenters || [];
      setUserData(data.data);
      if (diagnosticCenters.length > 0) {
        successAlert("Diagnostic Centers Found");
        setLoading(false);
        router.push("/chooseDc");
      } else {
        warningAlert("No Diagnostic Centers found");
        setLoading(false);
        router.push("/onboard");
      }
    }
  };

  useEffect(() => {
    const initialize = async () => {
      if (diagnosticCenter?.data && userData?.data) {
        setUserData(userData?.data);
        successAlert("Logging into Diagnostic Profile");
        router.push("/dashboard");
      } else {
        if (status === 'success' && userData) {
          handleUserData(userData);
        } else if (status === 'error') {
          errorAlert("User Not Found");
          if (userName && userPhoneNumber) {
            createUser.mutate({ data: { userName, phoneNumber: userPhoneNumber } });
          }
        }
      }
    };

    initialize();
  }, [status, userData, userName, userPhoneNumber, profileState]);

  return (
    <UserLayout tabDescription='Verify User' tabName="Admin Omerald | Verify User">
      <div className="h-[80vh] p-4 py-10 text-center m-auto flex justify-center">
        <section className="my-10">
          <div className="bg-container w-[75vw] m-auto">
            {loading && <Loader />}
            <img src='/verifyProfile.gif' alt="Verification" />
          </div>
        </section>
      </div>
    </UserLayout>
  );
};

export default VerifyUser;
