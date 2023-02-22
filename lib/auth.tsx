import { warningAlert } from "@/components/alerts/alert";
import { getAuth, onIdTokenChanged, User } from "firebase/auth";
import { UserDetails } from "middleware/models.interface";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { deleteSession, getUserDetails, setSession } from "./db";
import firebaseApp from "./firebase";
export interface AuthContextInterface {
  user: User | null;
  diagnosticDetails: UserDetails | null;
  loading: boolean;
  signIn: (user: User, redirect: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const authContext = createContext<AuthContextInterface>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useFirebaseAuth();
  return <authContext.Provider value={auth}>{children} </authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useFirebaseAuth() {
  const auth = getAuth(firebaseApp);
  const [user, setUser] = useState<User | null>(null);
  const [diagnosticDetails, setDiagnosticDetails] =
    useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleUser = async (rawUser: User | null) => {
    if (rawUser) {
      const token = await rawUser.getIdToken();
      const phoneNumber = rawUser.phoneNumber || "";
      setUser(rawUser);
      const resp = await getUserDetails(token, phoneNumber);
      if (resp.status == 200) {
        setDiagnosticDetails(resp.data);
      }
      await setSession(token, phoneNumber);
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  };

  const signIn = async (user: User, redirect: string) => {
    const token = await user.getIdToken();
    const phoneNumber = user.phoneNumber || "";
    // await handleUser(user, token, phoneNumber); DO NOT call handleUser, because when user logs in , it will automatically get called.
    const resp = await getUserDetails(token, phoneNumber);

    if (resp.status == 200 && resp.data != null) {
      setDiagnosticDetails(resp.data);
      router.push(redirect);
    } else if (resp.status == 404) {
      router.push("/onboard");
    }
  };

  const signOut = async () => {
    if (user) {
      const token = await user.getIdToken();
      const phoneNumber = user.phoneNumber || "";
      await deleteSession(token, phoneNumber);
    }
    //Check it once does setUser and setDiagnostic details to null required for this step
    setUser(null);
    setDiagnosticDetails(null);
    await auth.signOut();
    warningAlert("User Logged Out")
    router.push("");
  };

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, handleUser);
    return () => unsubscribe();
  }, []);

  /* TODO: some log in and log out function that will also call handleUser */

  return {
    user,
    diagnosticDetails,
    setDiagnosticDetails,
    loading,
    signIn,
    signOut,
  };
}