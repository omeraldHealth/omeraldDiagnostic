import React, { createContext, useContext, useState, useEffect } from 'react'
import { getAuth, onIdTokenChanged, User,setPersistence,browserSessionPersistence } from "firebase/auth";
import { AuthContextInterface, UserDetails } from 'utils'
import { useRouter } from 'next/router';
import { getUserDetails } from 'utils/hook/userDetail';
import { deleteSession, setSession } from 'utils/hook/session';
import { warningAlert } from '@components/atoms/alerts/alert';
import firebaseApp from 'utils/auth/firebase';

const AuthContext = createContext<AuthContextInterface>(null)

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const auth = useFirebaseAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useFirebaseAuth() {
  const auth = getAuth(firebaseApp);
  const [user, setUser] = useState<User | null>(null);
  const [diagnosticDetails, setDiagnosticDetails] =useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, handleUser);
    return () => unsubscribe();}, []
  );

  setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    // return signIn(user?.phoneNumber,"/dashboard");
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  const handleUser = async (rawUser: User | null) => {
    if (rawUser) {
      const phoneNumber = rawUser.phoneNumber || "";
      const resp = await getUserDetails({"phoneNumber":phoneNumber});
      if (resp) {
        setDiagnosticDetails(resp);
      }
      await setSession(phoneNumber);
      setUser(rawUser);
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  };

  const signIn = async (user: User, redirect: string) => {
    const phoneNumber = user.phoneNumber || "";
    const resp = await getUserDetails({"phoneNumber":phoneNumber});
    if (resp) {
      setDiagnosticDetails(resp);
      router.push(redirect);
    } else {
      router.push("/onboard");
    }
  };

  const signOut = async () => {
    if (user) {
      const phoneNumber = user.phoneNumber || "";
      await deleteSession(phoneNumber);
    }

    setUser(null);
    setDiagnosticDetails(null);
    await auth.signOut();
    warningAlert("User Logged Out")
    router.push("");
  };

  return {
    user,
    diagnosticDetails,
    setDiagnosticDetails,
    loading,
    signIn,
    signOut,
  };
}

export function useAuthContext() {
	return useContext(AuthContext)
}
