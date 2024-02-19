
import { GlobalStyle, theme } from '@styles/index'
import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'
import '../styles/tailwind.css'
import { ClerkProvider } from '@clerk/nextjs';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import { Provider } from 'react-redux';
import store from 'utils/store/store'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 10 * (60 * 1000), // 10 mins 
    },
  },
})
const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function App({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
		setIsMounted(true)
	}, [])

  return (
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} {...pageProps}>
          <ToastContainer/>
          <Component {...pageProps} />
        </ClerkProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </RecoilRoot>
    </QueryClientProvider>
    </Provider>
  );
}
