import { SignUp } from '@clerk/nextjs';
import { ClerkLoading } from "@clerk/nextjs";
import Head from '@components/atoms/head/head';
import { Navbar } from '@components/molecules/navbar';
import { PageTemplate } from '@components/templates/pageTemplate'
import React, { Fragment } from 'react';

const SignUpComp = () => {
  return (
    <div>
      <Fragment>
      <Head title={'Omerald Diagnostic | Sign In'} />
      <PageTemplate>
        <Navbar/>
        <div className="h-[70vh] p-4 py-10 text-center m-auto flex justify-center">
          
          <section className="my-10">
            <SignUp signInUrl="/signIn" redirectUrl="/dashboard" />
            <ClerkLoading>
              <p>Loading...</p>
            </ClerkLoading>
          </section>
        </div>
      </PageTemplate>
      </Fragment>
    </div>
  );
};

export default SignUpComp;
