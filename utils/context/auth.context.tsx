import React, { createContext, useContext, useState, useEffect } from 'react'
import { getAuth, onIdTokenChanged, User,setPersistence,browserSessionPersistence } from "firebase/auth";
import { AuthContextInterface, getEmployeeById, initialAuthContext, UserDetails } from 'utils'
import { useRouter } from 'next/router';
import { getUserDetails } from 'utils/hook/userDetail';
import { warningAlert } from '@components/atoms/alerts/alert';
import firebaseApp from 'utils/auth/firebase';
import axios from 'axios';

const AuthContext = createContext<AuthContextInterface>(initialAuthContext)

//context logic and function
function useFirebaseAuth() {
  const auth = getAuth(firebaseApp);
  const [user, setUser] = useState<User | null>(null);
  const [diagnosticDetails, setDiagnosticDetails] = useState<UserDetails | null>(null);
  const [operator, setOperator] = useState<UserDetails | null>(null);
  const [activeBranch, setActiveBranch] = useState< any | null>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  let flag = true;

  // useEffect(() => {
  //   if(flag){
  //     const unsubscribe = onIdTokenChanged(auth, handleUser);
  //     flag=false;
  //     return () => unsubscribe();
  //   }
  // }, []
  // );

  useEffect(()=>{
    if(diagnosticDetails){
        let branchListTmp = diagnosticDetails?.branchDetails?.[0];
        setActiveBranch(branchListTmp)
    }
   
},[diagnosticDetails])

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
      let flag=true
      const phoneNumber = rawUser.phoneNumber || "";
      const {data:employees} = await axios.get(getEmployeeById+phoneNumber)
      const {data,status} = await getUserDetails({phoneNumber: employees[0]?.mainBranchId || phoneNumber})
      if (status==200 && (data?.phoneNumber || employees[0]?._id)) {
        // @ts-ignore
        setDiagnosticDetails(data);
        // @ts-ignore
        employees.length>0 ? setOperator(employees[0]) : setOperator(data?.managersDetail[0])
        flag=false
      }
      setUser(rawUser);
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  };

  const signIn = async (phoneNumber: User, redirect: string) => {
    let flag=true
    // const phoneNumber = user.phoneNumber || "";
    const {data:employees} = await axios.get(getEmployeeById+phoneNumber)
    const {data,status} = await getUserDetails({phoneNumber: employees[0]?.mainBranchId || phoneNumber})

    if (status==200 && (data?.phoneNumber || employees[0]?._id)) {
      // @ts-ignore
      setDiagnosticDetails(data);
      // @ts-ignore
      employees.length>0 ? setOperator(employees[0]) : setOperator(data?.managersDetail[0])
      flag && router.push(redirect);
      flag=false
    }
    else {
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
    operator,
    diagnosticDetails,
    loading,
    activeBranch,
    setActiveBranch,
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
