import React, { cloneElement, ReactElement, ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/router";

// export type NextPageWithLayout = NextPage & {
//   auth: AuthContextInterface;
//   // getLayout?: (page: ReactElement) => ReactNode;
// };

// type CustomAppProps = AppProps & {
//   auth:AuthContextInterface
// };

//TODO: ADD EXCEPTIONS HERE
const allowedPaths = ["", "/", "/login"];

const Allowed = ({
  children,
}: {
  children: ReactElement;
}): JSX.Element | null => {
  const auth = useAuth();
  const router = useRouter();

  if (allowedPaths.includes(router.pathname)) {
    return <>{children}</>;
  } else if (auth?.loading) {
    return <h1 className="grid h-screen place-content-center">Loading...</h1>;
  } else if (auth?.user && router.pathname == "/onboard") {
    return cloneElement(children, { auth: auth });
  } else if (auth?.user && auth?.diagnosticDetails) {
    return cloneElement(children, { auth: auth });
  } else if (auth?.user) {
    router.push("/onboard");
    return null;
  } else {
    router.push("/");
    return null;
  }
};
export default Allowed;
