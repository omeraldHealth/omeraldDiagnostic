import { Spinner } from "@components/atoms/loader";
import { useRouter } from "next/router";
import { useAuthContext } from "utils/context/auth.context";
import React, { cloneElement, ReactElement } from "react";

import { useUser } from '@clerk/nextjs';

const allowedPaths = ["","/","/signIn","/signUp","/404"];

const Allowed = ({children,}: {children: ReactElement;}): JSX.Element | null => {
  const {diagnosticDetails} = useAuthContext();
  const router = useRouter();
  const {user,isLoaded} = useUser();

  if (allowedPaths.includes(router.pathname)) {
      return <>{children}</>;
  }else if (!isLoaded) {
    return <Spinner />;
  } else if (user) {
    if(diagnosticDetails){
      if (router.pathname === "/dashboard") {
          return cloneElement(children);
      }else if(router.pathname === "/onboard"){
        router.push("/dashboard")
      }
    }else{
        if (router.pathname === "/onboard" ) {
          return cloneElement(children);
        }
    }
  } else{
    router?.push("/signIn")
  } 
};

export default Allowed;
