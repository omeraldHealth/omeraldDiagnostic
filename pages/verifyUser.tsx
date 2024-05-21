import { useUser } from '@clerk/clerk-react';
import { successAlert, warningAlert2 } from '@components/atoms/alerts/alert';
import { Loader } from '@components/atoms/loader/loader';
import { UserLayout } from '@components/templates/pageTemplate';
import { getDiagnosticUserApi } from '@utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useQueryGetData } from 'utils/reactQuery';
import { userState } from '../components/common/recoil/user';

const VerifyUser = () => {

  const { user } = useUser();
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const setUserData = useSetRecoilState(userState)

  // Fetch User
  let userPhoneNumber = user?.phoneNumbers[0]?.phoneNumber;

  // Get Users From DB when userPhoneNumber is found
  const {data:userData, status} = useQueryGetData('userData', getDiagnosticUserApi+ userPhoneNumber, {enabled: !!userPhoneNumber });

  useEffect(() => {
    if (status === "success") {
      setLoading(false);
    }

    if (userData && userData.data) {
      const diagnosticCenters = userData.data?.diagnosticCenters || [];
      setUserData(userData?.data)
      if (diagnosticCenters.length > 0) {
        successAlert("Diagnostic Centers Found");
        router.push("/chooseDc");
      } else {
        warningAlert2("No Diagnostic Centers found");
        router.push("/onboard");
      }
    }
  }, [status, userData, router]);

  return (
    <UserLayout tabName="Admin Omerald | Verify User">
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

