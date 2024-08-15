import React from "react";
import { SignUp } from "@clerk/nextjs";
import { ClerkLoading } from "@clerk/nextjs";
import { UserLayout } from "@components/templates/pageTemplate";

const SignUpComp = () => {
  return (
    <UserLayout tabDescription="Sign up" tabName="Admin Diagnostic | Sign Up">
      <div className="h-[80vh] p-4 py-10 text-center m-auto flex justify-center">
        <section className="my-10">
          <SignUp signInUrl="/signIn" redirectUrl="/verifyUser" />
          <ClerkLoading>
            <p>Loading...</p>
          </ClerkLoading>
        </section>
      </div>
    </UserLayout>
  );
};

export default SignUpComp;
