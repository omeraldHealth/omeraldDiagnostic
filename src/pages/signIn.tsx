import React, { useEffect } from 'react';
import { ClerkLoading } from "@clerk/nextjs";
import { UserLayout } from "../components/templates/pageTemplate";
import { SignIn } from '@clerk/nextjs';

// Component to handle user sign-in
const SignInComp = () => {

  useEffect(()=>{
    localStorage.setItem("selectedDc", "null");

  },[])

  return (
    <UserLayout tabDescription='signIn' tabName="Admin Diagnostic | Sign In">
      <div className="h-[70vh] p-4 py-10 text-center m-auto flex justify-center">
        <section className="my-10">
          {/* SignIn component from Clerk for authentication */}
          <SignIn signUpUrl="/signUp" redirectUrl="/verifyUser" />
          <ClerkLoading>
            <p>Loading...</p>
          </ClerkLoading>
        </section>
      </div>
    </UserLayout>
  );
};

export default SignInComp;
