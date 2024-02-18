import { SignUp } from '@clerk/nextjs';
import { ClerkLoading } from "@clerk/nextjs";
import { UserLayout } from '@components/templates/pageTemplate'
import React from 'react';

const SignUpComp = () => {
  return (
    <div>
      <UserLayout tabName="Admin Omerald | Sign Up">
        <div className="h-[80vh] p-4 py-10 text-center m-auto flex justify-center">
          <section className="my-10">
            <SignUp signInUrl="/signIn" redirectUrl="/dashboard" />
            <ClerkLoading>
              <p>Loading...</p>
            </ClerkLoading>
          </section>
        </div>
      </UserLayout>
    </div>
  );
};

export default SignUpComp;
