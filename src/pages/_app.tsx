import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { ClerkProvider } from '@clerk/nextjs';
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { PageLoader } from '@/components/common/pageLoader';
import GlobalStyle from '@/styles/globals';
import '../styles/index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      refetchInterval: false,
      refetchOnMount: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <PageLoader />;

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
            <Component {...pageProps} />
          </ChakraProvider>
        </ClerkProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
