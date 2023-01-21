import React, { cloneElement, ReactElement, ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/router";
import { LoaderComp } from "@/components/alerts/loader";
import { successAlert } from "@/components/alerts/alert";

// export type NextPageWithLayout = NextPage & {
//   auth: AuthContextInterface;
//   // getLayout?: (page: ReactElement) => ReactNode;
// };

// type CustomAppProps = AppProps & {
//   auth:AuthContextInterface
// };

//TODO: ADD EXCEPTIONS HERE
const allowedPaths = ["","/","/login"];
let flag = true;
const Allowed = ({
  children,
}: {
  children: ReactElement;
}): JSX.Element | null => {
  const auth = useAuth();
  const router = useRouter();

  if (allowedPaths.includes(router.pathname) && !auth?.user) {
    return <>{children}</>;
  } else if (auth?.loading) {
    return <LoaderComp />;
  } else if (auth?.user && auth?.diagnosticDetails) {
    if (router.pathname === "/onboard" || router.pathname === "/") {
      if(flag){
        // successAlert("User logged in")
        flag = false;
      }
      router.push("/dashboard");
      return null;
    }
    return cloneElement(children, { auth: auth });
  } else if (auth?.user) {
    if (router.pathname === "/onboard") {
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
