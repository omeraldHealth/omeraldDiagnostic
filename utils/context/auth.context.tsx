import React, { createContext, useContext, useState, useEffect } from 'react'
import { getAuth, onIdTokenChanged, User,setPersistence,browserSessionPersistence } from "firebase/auth";
import { AuthContextInterface, initialAuthContext, UserDetails } from 'utils'
import { useRouter } from 'next/router';
import { getUserDetails } from 'utils/hook/userDetail';
import { warningAlert } from '@components/atoms/alerts/alert';
import firebaseApp from 'utils/auth/firebase';

const AuthContext = createContext<AuthContextInterface>(initialAuthContext)

//context logic and function
function useFirebaseAuth() {
  const auth = getAuth(firebaseApp);
  const [user, setUser] = useState<User | null>(null);
  const [diagnosticDetails, setDiagnosticDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, handleUser);
    return () => unsubscribe();}, []
  );

  setPersistence(auth, browserSessionPersistence)
  .then(() => {
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  const handleUser = async (rawUser: User | null) => {
    if (rawUser) {
      const phoneNumber = rawUser.phoneNumber || "";
      const {data,status} = await getUserDetails({phoneNumber:phoneNumber})
      if (status==200) {
        // @ts-ignore
        setDiagnosticDetails(data);
      }
      setUser(rawUser);
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  };

  const signIn = async (user: User, redirect: string) => {
    let flag=true
    const phoneNumber = user.phoneNumber || "";
    const {data,status} = await getUserDetails({phoneNumber:phoneNumber})
    if (status==200) {
      // @ts-ignore
      setDiagnosticDetails(data);
      flag && router.push(redirect);
      flag=false
    } else {
      router.push("/onboard");
    }
  };

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
    setDiagnosticDetails(null);
    warningAlert("User Logged Out")
    router.push("/");
  };

  return {
    user,
    diagnosticDetails,
    loading,
    signIn,
    signOut,
  };
}

//exporting context data
export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const auth = useFirebaseAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

//context hook
export function useAuthContext() {
	return useContext(AuthContext)
}
