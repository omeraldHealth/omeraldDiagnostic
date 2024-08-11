import { useSession, useUser } from "@clerk/clerk-react";
import { errorAlert, successAlert, warningAlert } from "@components/atoms/alerts/alert";
import { userState } from "@components/common/recoil/user";
import { UserLayout } from "@components/templates/pageTemplate";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUser, useGetUser } from "@utils/reactQuery";
import { USER_DATA } from "@utils/constants/interface";
import { Spinner } from "@components/atoms/loader";
import verifyUser from "@public/verifyUser.gif"

const VerifyUser = () => {
  const { session } = useSession();
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const phone = user?.phoneNumbers?.[0]?.phoneNumber || "";
  const setUserRecoil = useSetRecoilState(userState);
  const [loading, setLoading] = useState(true);
  const { data: userData, refetch, isLoading } = useGetUser({ userPhoneNumber: phone });
  const createUserMutation = useCreateUser({
    onSuccess: (resp) => {
      if (resp.status === 201) {
        successAlert("User Created Successfully");
        setUserRecoil(resp?.data);
        phone && refetch();
        //@ts-ignore
        handleVerifyUser(resp?.data);
      }
    },
    onError: () => {
      errorAlert("Error creating user");
      router.push("/")
    },
  });

  useEffect(() => {
    if(phone){
      refetch()
    }
  }, [phone]);

  const handleCreateUser = (userObj: USER_DATA): void => {
    createUserMutation.mutate({ data: userObj });
  };

  const handleCheckDcProfile = (data: USER_DATA) => {
    if (data?.diagnosticCenters?.length > 0) {
      setUserRecoil(data);
      router.push("/chooseDc");
    } else {
      warningAlert("Diagnostic Profiles not found, please onboard");
      router.push("/onboard");
    }
  };

  const handleVerifyUser = (userObj: USER_DATA | null): void => {
    if (!userObj) {
      const newUser: USER_DATA = {
        userName: user?.fullName || "",
        phoneNumber: phone || "",
        diagnosticCenters: []
      };
      handleCreateUser(newUser);
      return;
    }

    if (userObj?.diagnosticCenters) {
      handleCheckDcProfile(userObj);
    }
  };

  useEffect(() => {
    if (
      session?.status === 'active' &&
      !isLoading &&
      userData &&
      // @ts-ignore
      userData?.data
    ) {
      //@ts-ignore
      handleVerifyUser(userData.data);
    }

    if (
      session?.status === 'active' &&
      !isLoading &&
      !userData
    ) {
      //@ts-ignore
      handleVerifyUser(userData?.data);
    }

  }, [session?.status, isLoading, userData]);  

  return (
    <UserLayout tabDescription="Verify User" tabName="Admin Diagnostic | Verify User">
      {(loading || isLoading || !isLoaded) && <Spinner />}
      <div className="h-[80vh] p-4 py-10 text-center m-auto flex justify-center">
        <section className="my-10">
          <div className="bg-container w-[45vw] m-auto">
            <img src={verifyUser.src} alt="Verification" />
          </div>
        </section>
      </div>
    </UserLayout>
  );
};

export default VerifyUser;
