import React, { ReactElement, cloneElement } from 'react';
import { Spinner } from '@components/atoms/loader';
import { useRouter } from 'next/router';
import { useAuthContext } from '@utils/context/auth.context';
import { useUser } from '@clerk/nextjs';

// Define allowed paths
const allowedPaths = ["", "/", "/signIn", "/signUp", "/404", "/info/[detail]", "/verifyUser"];

const Allowed = ({ children }: { children: ReactElement }): JSX.Element | null => {
  const { diagnosticDetails } = useAuthContext();
  const router = useRouter();
  const { user, isLoaded } = useUser();

  // Check if the current path is allowed without authentication
  if (allowedPaths.includes(router.pathname)) {
    return <>{children}</>;
  } else if (!isLoaded) {
    // Show a spinner while user data is loading
    return <Spinner />;
  } else if (user) {
    // User is authenticated
    if (diagnosticDetails) {
      // User has diagnostic details
      if (router.pathname === '/dashboard') {
        return cloneElement(children);
      } else if (router.pathname === '/onboard') {
        router.push('/dashboard');
      }
    } else {
      // User does not have diagnostic details
      if (router.pathname === '/onboard') {
        return cloneElement(children);
      } else if (router.pathname === '/dashboard') {
        router.push('/onboard');
      }
    }
  } else {
    // User is not authenticated, redirect to signIn
    router?.push('/signIn');
  }

  // Default case, should never reach here
  return null;
};

export default Allowed;
