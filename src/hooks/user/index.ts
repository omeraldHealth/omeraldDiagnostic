import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, useUser } from '@clerk/clerk-react';
import { useSetRecoilState } from 'recoil';
import { userDataState } from '@/utils/recoil';
import { useGetUser } from '@/utils/query/getQueries';
import { useCreateUser } from '@/utils/query/createQueries';
import { errorAlert, successAlert, warningAlert } from '@/components/common/alerts';
import { UserInfo } from '@/utils/interface/getData';
import { usePersistedDCState } from '../localstorage';

export const useUserVerification = () => {
  const { session } = useSession();
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const phone = user?.phoneNumbers?.[0]?.phoneNumber || '';
  const setUserRecoil = useSetRecoilState(userDataState);
  const [selectedDc] = usePersistedDCState()

  const { data: userD, isLoading } = useGetUser({ userPhoneNumber: phone });
  //@ts-ignore
  const userdata: UserInfo = userD && userD?.data;
  const createUserMutation = useCreateUser<UserInfo, { data: UserInfo }>({
    onSuccess: (resp) => {
      if (resp.status === 201) {
        successAlert('User Created Successfully');
        setUserRecoil(resp?.data);
        handleUserVerification(resp?.data);
      }
    },
    onError: () => {
      errorAlert('Error creating user');
      router.push('/');
    },
  });

  useEffect(() => {
    if (isLoaded && session?.status === 'active') {
      if (userdata) {
        handleUserVerification(userdata);
      } else if (!isLoading) {
        handleUserVerification(null);
      }
    }
  }, [session?.status, isLoading, userdata, isLoaded]);

  const handleUserVerification = (userObj: UserInfo | null) => {
    if (!userObj) {
      const newUser: UserInfo = {
        userName: user?.fullName || '',
        phoneNumber: phone || '',
        diagnosticCenters: [],
      };
      handleCreateUser(newUser);
      return;
    }

    if (userObj) { 
      setUserRecoil(userObj);
    }

    if (userObj?.diagnosticCenters?.length > 0) {

      const selectedDcPresent = selectedDc && userObj?.diagnosticCenters?.some((dc) => dc.diagnostic._id === selectedDc)
      if (!selectedDcPresent) {
        router.push('/chooseDc');
      } else {
        router.push('/dashboard');
      }
    } else {
      warningAlert('Diagnostic Profiles not found, please onboard');
      router.push('/onboard');
    }
  };

  const handleCreateUser = (userObj: any) => {
    createUserMutation.mutate({ ...userObj });
  };

  return {
    isLoading: isLoading || !isLoaded,
  };
};
