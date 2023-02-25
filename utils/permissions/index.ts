import { useRouter } from "next/router";
import  { cloneElement, ReactElement } from "react";
import { useAuthContext } from "utils/context/auth.context";

const allowedPaths = ["","/","/login"];
let flag = true;

export default function Allowed({children,}: {children: ReactElement}) {
    const auth = useAuthContext();
    const router = useRouter();

    if (allowedPaths.includes(router.pathname) && !auth?.user) {
        return {children}
    }
    else if (auth?.loading) {
        return "<p>Loading</p>"
    }
    else if (auth?.user && auth?.diagnosticDetails) {
        if (router.pathname === "/onboard" || router.pathname === "/") {
          if(flag){
            flag = false;
          }
          router.push("/dashboard");
          return null;
        }
        return cloneElement(children, { auth: auth });
    } 
    else if (auth?.user) {
        if (router.pathname === "/onboard") {
          return cloneElement(children);
        }
        router.push("/onboard");
        return null;
    } 
    else {
        router.push("/");
        return null;
    } 
}   