import React from 'react';
import { ClerkLoading } from "@clerk/nextjs";
import { UserLayout } from "../components/templates/pageTemplate";
import { SignIn }from '@clerk/nextjs';

const SignInComp = () => {
  return (
    <UserLayout tabName="Admin Omerald | Sign In">
    <div className="h-[70vh] p-4 py-10 text-center m-auto flex justify-center">
      <section className="my-10">
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
