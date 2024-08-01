import { useUser } from "@clerk/clerk-react";
import { errorAlert, successAlert, warningAlert } from "@components/atoms/alerts/alert";
import { Spinner } from "@components/atoms/loader";
import { userState } from "@components/common/recoil/user";
import { UserLayout } from "@components/templates/pageTemplate";
import { getDiagnosticUserApi } from "@utils";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUser } from "utils/reactQuery";

const VerifyUser = () => {
  const [loading, setLoading] = useState(true);
  const { user, isLoaded } = useUser();
  const router = useRouter()
  const setUserData = useSetRecoilState(userState)
  
  const createUserMutation = useCreateUser({
    onSuccess: (resp) => {
      if(resp.status === 201){
        successAlert("User Created Succesfully")
        user && fetchUser(user.phoneNumbers[0].phoneNumber)
        setLoading(false)
      }
    },
    onError: () => {
      setLoading(false);
    },
  });

  useEffect(()=>{
    if(isLoaded && user){
      fetchUser(user?.phoneNumbers[0].phoneNumber)
    }
  },[user])

  const fetchUser = async (phoneNumber: string) => {
    if (phoneNumber) {
      try {
        const resp = await axios.get(`${getDiagnosticUserApi}${phoneNumber}`);
        if (resp.status === 200) {
          setUserData(resp.data);
          checkDcProfile(resp.data);
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          // warningAlert('Diagnostic User not found for this contact')
          createUser();
        } else {
          errorAlert('An error occurred while fetching user data.');
          setLoading(false)
          router.push("/")
        }
      }
    }
  };

  const checkDcProfile = (data : any) => {
    if(data && data?.diagnosticCenters && data?.diagnosticCenters?.length>0){
      // warningAlert('Diagnostic Profiles found for this contact')
      router.push("/chooseDc")
    }else{
      warningAlert('Diagnostic Profiles not found, please onboard')
      router.push("/onboard")
    }
  }

  const createUser = async () => {
    try {
      createUserMutation.mutate({
        data: {
          userName: user?.fullName,
          phoneNumber: user?.phoneNumbers?.[0]?.phoneNumber,
          role: 'user',
        },
      });
    } catch (error) {
      if (error.response?.data.includes('duplicate')) {
        errorAlert('Profile already created, please check with admin');
        setLoading(false)
      } else {
        errorAlert('An error occurred while creating the profile.');
        setLoading(false)
      }
      router.push("/")
    }
  };

  return (
        <UserLayout tabDescription="Verify User" tabName="Admin Diagnostic | Verify User">
          <div className="h-[80vh] p-4 py-10 text-center m-auto flex justify-center">
            <section className="my-10">
              <div className="bg-container w-[75vw] m-auto">
                {loading && <Spinner />}
                <img src="/verifyProfile.gif" alt="Verification" />
              </div>
            </section>
          </div>
        </UserLayout>
  );
}

export default VerifyUser