import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { ClerkProvider } from "@clerk/nextjs";
import { ChakraProvider } from "@chakra-ui/react";
import { GlobalStyle } from "@styles/index";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { AppProps } from "next/app";
import "@styles/tailwind.css";
import ErrorBoundary from "../components/common/footer/error";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      staleTime: 10 * (60 * 1000), // 10 mins
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      refetchInterval: false, // Disable background refetch
      refetchOnMount: false,
    },
  },
});

const clerkFrontendApi = process.env
  .NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

export default function App({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ClerkProvider publishableKey={clerkFrontendApi} {...pageProps}>
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
