import { useEffect } from 'react';
import { UserLayout } from '@components/templates/pageTemplate';
import { useSession, useUser } from '@clerk/clerk-react';
import { useRouter } from 'next/router';
import { getDiagProfileByPhoneApi } from '../utils';
import { errorAlert, successAlert } from '../components/atoms/alerts/alert';
import { useSetRecoilState } from 'recoil';
import { profileState } from '../components/common/recoil/profile';
import { operatorState } from "../components/common/recoil/operator/index";
import axios from 'axios';
import { branchState } from '@components/common/recoil/branch/branch';

const VerifyUser = () => {
  const { session, isLoaded } = useSession();
  const { user } = useUser();
  const router = useRouter();
  const setProfile = useSetRecoilState(profileState);
  const setManagerValue = useSetRecoilState(operatorState);
  const setOperator = useSetRecoilState(operatorState);
  const setCurrentBranch = useSetRecoilState(branchState);
  const phoneNumber = user?.phoneNumbers[0]?.phoneNumber;

  const fetchData = async () => {
    try {
      if (!isLoaded || session?.status !== 'active') {
        router.push('/signIn');
        return;
      }

      const { data, status } = await axios.get(getDiagProfileByPhoneApi + phoneNumber);

      if (status === 200 && data) {
        setProfile(data);
        setManagerValue(assignManager(data.managersDetail, phoneNumber || ""));
        setCurrentBranch(data.branchDetails?.[0]);
        setOperator(data.managersDetail[0]);
        successAlert("Profile fetched successfully");
        router.push("/dashboard");
      }
    } catch (error) {
      errorAlert("Profile not found");
      router.push("/onboard");
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, session, isLoaded, phoneNumber, setProfile, setManagerValue, setCurrentBranch, setOperator, router]);

  return (
    <UserLayout tabName="Admin Omerald | Verify User">
      <div className="h-[80vh] p-4 py-10 text-center m-auto flex justify-center">
        <section className="my-10">
          <div className="bg-container w-[75vw] m-auto">
            <img src='/verifyProfile.gif' alt="Verification" />
          </div>
        </section>
      </div>
    </UserLayout>
  );
};

const assignManager = (managerList: any, phoneNumber: string) => {
  return managerList.find((manager: any) => manager?.managerContact === phoneNumber) || null;
};

export default VerifyUser;
