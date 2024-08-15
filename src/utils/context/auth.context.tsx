import React, { createContext, useContext, useState, useEffect } from "react";
import {
  AuthContextInterface,
  UserDetailsInterface,
  initialAuthContext,
} from "@utils/index";
import { useRouter } from "next/router";
import axios from "axios";
import { useUser, useClerk } from "@clerk/nextjs";

const AuthContext = createContext<AuthContextInterface>(initialAuthContext);

//context logic and function
function useApplicationAuth() {
  const { user: ClerkUser } = useUser();
  const { signOut: logOut } = useClerk();
  const [user, setUser] = useState<any | null>(null);
  const [diagnosticDetails, setDiagnosticDetails] =
    useState<UserDetailsInterface | null>(null);
  const [operator, setOperator] = useState<UserDetailsInterface | null>(null);
  const [activeBranch, setActiveBranch] = useState<any | null>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (diagnosticDetails) {
      let branchListTmp = diagnosticDetails?.branchDetails?.[0];
      setActiveBranch(branchListTmp);
    }
  }, [diagnosticDetails]);

  useEffect(() => {
    handleUser();
  }, [ClerkUser]);

  const handleUser = async () => {
    if (ClerkUser) {
      let flag = true;
      const phoneNumber = ClerkUser?.phoneNumbers[0]?.phoneNumber || "";
      const { data: employees } = await axios.get(
        getEmployeeById + phoneNumber,
      );
      const { data, status } = await getUserDetails({
        phoneNumber: employees?.[0]?.mainBranchId || phoneNumber,
      });
      if (status == 200 && (data?.phoneNumber || employees?.[0]?._id)) {
        // @ts-ignore
        setDiagnosticDetails(data);
        // @ts-ignore
        employees?.length > 0
          ? setOperator(employees[0])
          : setOperator(data?.managersDetail[0]);
        flag = false;
      }
      // @ts-ignore
      setUser({
        phoneNumber: ClerkUser?.phoneNumbers[0]?.phoneNumber || "",
        data: ClerkUser,
      });
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  };

  return {
    user,
    operator,
    diagnosticDetails,
    loading,
    activeBranch,
    setActiveBranch,
  };
}

//exporting context data
export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useApplicationAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

//context hook
export function useAuthContext() {
  return useContext(AuthContext);
}
