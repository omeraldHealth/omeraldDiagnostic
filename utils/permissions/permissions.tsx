import { successAlert } from "@components/atoms/alerts/alert";
import { Spinner } from "@components/atoms/loader";
import { useRouter } from "next/router";
import { useAuthContext } from "utils/context/auth.context";
import { allowedPaths } from "utils/types/molecules/users.interface";
import React, { cloneElement, ReactElement } from "react";

// Decides the permission of the tabs based on user logged in or not
const Allowed = ({children,}: {children: ReactElement;}): JSX.Element | null => {
  const {loading,user,diagnosticDetails} = useAuthContext();
  const router = useRouter();
  let flag = true;

  if (allowedPaths.includes(router.pathname)) {
    return <>{children}</>;
  } else if (loading) {
    return <Spinner />;
  } else if (user && diagnosticDetails) {
      if(flag){
        successAlert("User logged in")
        flag = false;
      }
      router.push("/dashboard");
      return null;
  } else if (user) {
    if (router.pathname === "/onboard" || router.pathname === "/") {
      return cloneElement(children);
    }
    return null;
  } else {
    return null;
  }
};

export default Allowed;
