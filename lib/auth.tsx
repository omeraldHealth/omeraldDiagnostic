import { AxiosResponse } from "axios";
import { User, UserCredential, UserInfo } from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { deleteSession, getUserDetails, setSession } from "./db";
import firebase from "./firebase";

//TODO: Imporve the interface
interface AuthContextInterface {
  user: User | null;
  loading: boolean;
  signIn: (user: User, redirect: string, phoneNumber: string) => Promise<any>;
  signOut?: () => Promise<void>;
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

  const handleUser = (
    rawUser: User | null,
    token: string,
    phoneNumber: string
  ) => {
    if (rawUser) {
      setUser(rawUser);
      console.log(rawUser);
      //TODO:update User session
      setSession(token, phoneNumber);
      setLoading(false);
      return user;
    } else {
      //TODO:remove user session
      deleteSession(token, phoneNumber);
      setUser(null);
      setLoading(false);
      return null;
    }
  };

  const signIn = async (user: User, redirect: string, phoneNumber: string) => {
    const token = await user.getIdToken();
    handleUser(user, token, phoneNumber);
    return await getUserDetails(token, phoneNumber);
  };

  const signOut = async (token: string, phoneNumber: string) => {
    handleUser(null, token, phoneNumber);
    return await firebase.auth().signOut();
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
