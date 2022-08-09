import { AxiosResponse } from "axios";
import { User, UserCredential, UserInfo } from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { getUserDetails } from "./db";
import firebase from "./firebase";

//TODO: Imporve the interface
interface AuthContextInterface {
  user: User | null;
  loading: boolean;
  signIn: (user: User, redirect: string, phoneNumber: string) => Promise<any>;
  signOut?: () => Promise<User | null>;
}

const authContext = createContext<AuthContextInterface>({
  user: null,
  loading: false,
  signIn: () => {},
  signOut: () => {},
});
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useFirebaseAuth();
  return <authContext.Provider value={auth}>{children} </authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUser = (rawUser: User | null) => {
    if (rawUser) {
      setUser(rawUser);
      console.log(rawUser);

      setLoading(false);
      return user;
    } else {
      //TODO:clear the
      setUser(null);
      setLoading(false);
      return null;
    }
  };

  const signIn = async (user: User, redirect: string, phoneNumber: string) => {
    const token = await user.getIdToken();
    handleUser(user);
    return await getUserDetails(token, phoneNumber);
  };

  const signOut = async () => {
    await firebase.auth().signOut();

    return handleUser(null);
  };

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onIdTokenChanged((user) => handleUser(user));
    return () => unsubscribe();
  }, []);

  /* TBA: some log in and log out function that will also call handleUser */

  return {
    user,
    loading,
    signIn,
    signOut,
  };
}
