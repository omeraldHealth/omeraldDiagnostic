import React, { useEffect, useState } from 'react';
import { UserLayout } from '@components/templates/pageTemplate';
import { Spinner } from '@components/atoms/loader';
import { useSession, useUser } from '@clerk/clerk-react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { profileState } from '@components/common/recoil/profile';
import { dashTabs } from '@components/common/recoil/dashboard';
import { useCreateUser, useGetUser } from 'utils/reactQuery';
import { errorAlert, successAlert } from '@components/atoms/alerts/alert';
import { phoneNumberState, userState } from '@components/common/recoil/user';

const VerifyUser = () => {
  const [loading, setLoading] = useState(true);
  const { session, isLoaded } = useSession();
  const { user } = useUser();
  const router = useRouter();
  const setUser = useSetRecoilState(userState);
  const setDash = useSetRecoilState(dashTabs);
  const {data: userData, refetch, isLoading} = useGetUser({userPhoneNumber: user?.phoneNumbers?.[0]?.phoneNumber})
  const createUserMutation = useCreateUser({
      onSuccess: (resp) => {
        successAlert("Created User");
        setUser(response.data);
      },
      onError: () => {
        errorAlert("Error Creating User");
        setLoading(false);
      }
    });

  useEffect(() => {
    if (isLoaded && session?.status !== 'active') {
      router.push('/signin');
    }

    const fetchUser = async () => {
      if(isLoaded && user && user?.fullName){
        try {
          const resp = await refetch()

          if (resp?.data?.status === 200) {
            const data = resp.data;
            if (data?.data?.diagnosticCenters.length > 0) {
              router.push("/chooseDc");
            } else {
              errorAlert("Diagnostic Profile not found");
              router.push("/onboard");
            }
          }else{
            createUser(user)
          }
        } catch (error) {
          handleFetchError(error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchUser()
  }, [isLoaded, session, user, router]);

  const handleFetchError = (error) => {
    if (error.response?.status === 404) {
      createUser(user);
    } else {
      errorAlert("Failed to fetch user.");
    }
  };

  const createUser = async (user) => {
    try {
      createUserMutation.mutate({ data: { userName:user?.fullName
        , phoneNumber: user?.phoneNumbers?.[0]?.phoneNumber,
        role: "user" }
      });
    } catch (error) {
      if (error.response?.data.includes('duplicate')) {
        errorAlert('Profile already created, please check with admin');
      } else {
        errorAlert("An error occurred while creating the profile.");
      }
    }
  };

  return (
    <UserLayout tabDescription='Verify User' tabName="Admin Diagnostic | Verify User">
      <div className="h-[80vh] p-4 py-10 text-center m-auto flex justify-center">
        <section className="my-10">
          <div className="bg-container w-[75vw] m-auto">
            {loading && <Spinner />}
            <img src='/verifyProfile.gif' alt="Verification" />
          </div>
        </section>
      </div>
    </UserLayout>
  );
};

export default VerifyUser;








// import { useUser } from '@clerk/clerk-react';
// import { errorAlert, successAlert, warningAlert } from '@components/atoms/alerts/alert';
// import { UserLayout } from '@components/templates/pageTemplate';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { useSetRecoilState } from 'recoil';
// import { useCreateUser, useGetDcProfile, useGetUser } from 'utils/reactQuery';
// import { userState } from '../components/common/recoil/user';
// import { profileState } from '@components/common/recoil/profile';
// import { Spinner } from '@components/atoms/loader';

// const VerifyUser = () => {
//   const { user } = useUser();
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const setUserData = useSetRecoilState(userState);
//   const setDiagnosticCenter = useSetRecoilState(profileState);
//   let userPhoneNumber = user?.phoneNumbers[0]?.phoneNumber;
//   const userName = user?.fullName;
  
//   // const { data: diagnosticCenter, status: centerStatus } = useGetDcProfile(selectedCenterId)
//   const { data: userData, status, refetch, isLoading } = useGetUser({userPhoneNumber})
//   let selectedCenterId = localStorage.getItem("selectedDc") ?? {};

//   // const localProfile = JSON.parse(localStorage.getItem('diagnosticCenter'));

//   // useEffect(()=>{
//   //   if(localProfile){
//   //     setDiagnosticCenter(localProfile)
//   //     successAlert("Login to "+localProfile?.centerName)
//   //     router.push("/dashboard")
//   //     setLoading(false)
//   //   }
//   // },[localProfile])

//   // useEffect(() => {
//   //   if (centerStatus === 'success' && diagnosticCenter?.data) {
//   //     setDiagnosticCenter(diagnosticCenter?.data)
//   //   }
//   // }, [centerStatus, diagnosticCenter]);
  
//   const createUser = useCreateUser({
//     onSuccess: () => {
//       successAlert("Created User");
//       fetchUserData();
//     },
//     onError: () => {
//       errorAlert("Error Creating User");
//       setLoading(false);
//     }
//   });

//   const fetchUserData = async () => {
//     const result = await refetch();
//     if (result.status === 'success' && result.data) {
//       setUserData(result?.data);
//       router.push("/onboard");
//     } else {
//       errorAlert("User Not Found");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//         // if (diagnosticCenter?.data && userData?.data) {
//         //   setUserData(userData?.data);
//         //   successAlert("Logging into Diagnostic Profile");
//         //   router.push("/dashboard");
//         // } else {

//         if(isLoading){
//           return;
//         }

//         if(!userData){
//           errorAlert("User Not Found");
//           if (userName && userPhoneNumber) {
//             createUser.mutate({ data: { userName, phoneNumber: userPhoneNumber } });
//           }
//         }

//         if(userData){
//           const diagnosticCenters = userData.data?.diagnosticCenters || [];
//           setUserData(userData?.data);
//           if (diagnosticCenters.length > 0) {
//             successAlert("Diagnostic Centers Found");
//             setLoading(false);
//             router.push("/chooseDc");
//           } else {
//             warningAlert("No Diagnostic Centers found");
//             setLoading(false);
//             router.push("/onboard");
//           }
//         }
//   }, [status, userData, isLoading, userName, userPhoneNumber, profileState]);

//   return (
//     <UserLayout tabDescription='Verify User' tabName="Admin Diagnostic | Verify User">
//       <div className="h-[80vh] p-4 py-10 text-center m-auto flex justify-center">
//         <section className="my-10">
//           <div className="bg-container w-[75vw] m-auto">
//             {loading && <Spinner />}
//             <img src='/verifyProfile.gif' alt="Verification" />
//           </div>
//         </section>
//       </div>
//     </UserLayout>
//   );
// };

// export default VerifyUser;
