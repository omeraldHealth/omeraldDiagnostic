import React, { useEffect } from 'react';
import { SignUp, useUser } from '@clerk/nextjs';
import { ClerkLoading } from "@clerk/nextjs";
import { UserLayout } from '@components/templates/pageTemplate'
import { warningAlert } from '@components/atoms/alerts/alert';

// Component to handle user sign-up
const SignUpComp = () => {
  // Get user details using Clerk's useUser hook
  const { user } = useUser();
  
  useEffect(() => {
    // Check if user is already logged in and show a warning
    if (user) {
      // warningAlert("User already logged in")
    }
  }, [user])

  return (
    <UserLayout tabDescription='Sign up' tabName="Admin Omerald | Sign Up">
      <div className="h-[80vh] p-4 py-10 text-center m-auto flex justify-center">
        <section className="my-10">
          {/* SignUp component from Clerk for user registration */}
          <SignUp signInUrl="/signIn" redirectUrl="/dashboard" />
          <ClerkLoading>
            <p>Loading...</p>
          </ClerkLoading>
        </section>
      </div>
    </UserLayout>
  );
};

export default SignUpComp;
