import React from 'react';
import { ClerkLoading } from '@clerk/nextjs';
import { SignIn } from '@clerk/nextjs';
import { PageLayout } from '@/components/layouts/pageLayout';

const SignInComp = () => {
  return (
    <PageLayout tabDescription="signIn" tabName="Admin Diagnostic | Sign In">
      <div className="h-[70vh] p-4 py-10 text-center m-auto flex justify-center">
        <section className="my-10">
          <SignIn signUpUrl="/signUp" redirectUrl="/verifyUser" />
          <ClerkLoading>
            <p>Loading...</p>
          </ClerkLoading>
        </section>
      </div>
    </PageLayout>
  );
};

export default SignInComp;
