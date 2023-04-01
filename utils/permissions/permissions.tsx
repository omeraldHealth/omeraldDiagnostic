import { Spinner } from "@components/atoms/loader";
import { useRouter } from "next/router";
import { useAuthContext } from "utils/context/auth.context";
import React, { cloneElement, ReactElement } from "react";

const allowedPaths = ["","/","/signIn","/404"];

const Allowed = ({children,}: {children: ReactElement;}): JSX.Element | null => {
  const auth = useAuthContext();
  const router = useRouter();

  if (allowedPaths.includes(router.pathname)) {
    return <>{children}</>;
  } else if (auth?.loading) {
    return <Spinner />;
  }else if (auth?.user && auth?.diagnosticDetails?.phoneNumber) {
    return cloneElement(children, { auth: auth });
  } else if (auth?.user && !auth?.diagnosticDetails){
    router.push("/onboard")
  }
};

export default Allowed;
