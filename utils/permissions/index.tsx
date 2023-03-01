import { successAlert } from "@components/atoms/alerts/alert";
import { Spinner } from "@components/atoms/loader";
import { useRouter } from "next/router";
import React, { cloneElement, ReactElement } from "react";
import { useAuthContext } from "utils/context/auth.context";

const allowedPaths = ["","/","/signIn"];
let flag = true;
const Allowed = ({children,}: {children: ReactElement;}): JSX.Element | null => {
  const auth = useAuthContext();
  const router = useRouter();

  if (allowedPaths.includes(router.pathname) && !auth?.user) {
    return <>{children}</>;
  } else if (auth?.loading) {
    return <Spinner />;
  } else if (auth?.user && auth?.diagnosticDetails) {
    if (router.pathname === "/onboard") {
      if(flag){
        successAlert("User logged in")
        flag = false;
      }
      router.push("/dashboard");
      return null;
    }else if(router.pathname === "/signIn"){
      if(flag){
        successAlert("User logged in")
        flag = false;
      }
      router.push("/dashboard");
      return null;
    }
    return cloneElement(children, { auth: auth });
  } else if (auth?.user) {
    if (router.pathname === "/onboard" || router.pathname === "/") {
      return cloneElement(children);
    }
    router.push("/onboard");
    return null;
  } else {
    router.push("/");
    return null;
  }
};
export default Allowed;
