import React, { useEffect } from "react";
import "react-phone-number-input/style.css";
import { useAuthContext } from "utils/context/auth.context";
import {ClerkLoading, SignIn,useSession,useUser} from "@clerk/nextjs"

const SignInComponent = () => {
  // const auth = getAuth();
  const {signIn,diagnosticDetails} = useAuthContext()
  const { session } = useSession();
  const { user } = useUser()
  
  useEffect(()=>{
    if(session?.status==="active"){
      //@ts-ignore
      signIn(user?.phoneNumbers[0]?.phoneNumber,"/verifyUser")
    }
  },[session])

  return (
    <section className="h-auto my-[10vh] flex justify-center">
        <SignIn signUpUrl="/signUp" redirectUrl="/verifyUser" />
        <ClerkLoading>
              <p>Loading...</p>
        </ClerkLoading>
    </section>
  );
};

export default SignInComponent;
