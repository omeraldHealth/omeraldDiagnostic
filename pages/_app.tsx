import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { ClerkProvider } from '@clerk/nextjs';
import { GlobalStyle } from '@styles/index';
import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { AppProps } from 'next/app';
import '@styles/tailwind.css';

// Configure the QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 10 * (60 * 1000), // 10 mins
    },
  },
});

// Ensure clerkFrontendApi is not undefined
const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

export default function App({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Return a loading state or skeleton component if needed
    return null;
  }

  
  return (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ClerkProvider publishableKey={clerkFrontendApi} {...pageProps}>
            <ToastContainer />
            <GlobalStyle />
            <Component {...pageProps} />
          </ClerkProvider>
        </RecoilRoot>
      </QueryClientProvider>
  );
}
