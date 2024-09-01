import React from 'react';
import { SignUp } from '@clerk/nextjs';
import { ClerkLoading } from '@clerk/nextjs';
import { PageLayout } from '@/components/layouts/pageLayout';

const SignUpComp = () => {
  return (
    <PageLayout tabDescription="Sign up" tabName="Admin Diagnostic | Sign Up">
      <div className="h-[80vh] p-4 py-10 text-center m-auto flex justify-center">
        <section className="my-10">
          <SignUp signInUrl="/signIn" redirectUrl="/verifyUser" />
          <ClerkLoading>
            <p>Loading...</p>
          </ClerkLoading>
        </section>
      </div>
    </PageLayout>
  );
};

export default SignUpComp;
