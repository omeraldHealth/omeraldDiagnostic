import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { ClerkProvider } from '@clerk/nextjs';
import { ChakraProvider } from '@chakra-ui/react';
import { GlobalStyle } from '@styles/index';
import { RecoilRoot } from 'recoil';
import { AppProps } from 'next/app';
import '@styles/tailwind.css';
import ErrorBoundary from '../components/common/footer/error';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      staleTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      refetchInterval: false, // Disable background refetch
      refetchOnMount: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  if (typeof window === 'undefined') {
    return null; // Prevent SSR issues
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          {...pageProps}
        >
          <ToastContainer />
          <GlobalStyle />
          <ChakraProvider>
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </ChakraProvider>
        </ClerkProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
