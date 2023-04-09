import React, { useEffect } from "react";
import "react-phone-number-input/style.css";
import { useAuthContext } from "utils/context/auth.context";
import {SignIn,useSession,useUser} from "@clerk/nextjs"

const SignInComponent = () => {
  // const auth = getAuth();
  const {signIn} = useAuthContext()
  const { session } = useSession();
  const { user } = useUser()
  
  useEffect(()=>{
    if(session?.status==="active"){
      //@ts-ignore
      signIn(user?.phoneNumbers[0]?.phoneNumber,"/dashboard")
    }
  },[session])

  return (
    <section className="h-auto my-[10vh] flex justify-center">
        <SignIn redirectUrl="/dashboard" signUpUrl="/signUp" />
    </section>
  );
};

export default SignInComponent;
