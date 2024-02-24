import React, { useEffect } from 'react';
import { ClerkLoading, useUser } from "@clerk/nextjs";
import { UserLayout } from "../components/templates/pageTemplate";
import { SignIn } from '@clerk/nextjs';
import { warningAlert } from '../components/atoms/alerts/alert';

// Component to handle user sign-in
const SignInComp = () => {
  // Get user details using Clerk's useUser hook
  const { user } = useUser();

  useEffect(() => {
    // Check if user is already logged in and show a warning
    if (user) {
      warningAlert("User already logged in");
    }
  }, [user]);

  return (
    <UserLayout tabName="Admin Omerald | Sign In">
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
