
import { GlobalStyle, theme } from '@styles/index'
import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from 'utils/context/auth.context'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import store from 'utils/store/store'
import Allowed from 'utils/permissions/permissions'
import type { AppProps } from 'next/app'
import '../styles/tailwind.css'
import { ClerkProvider } from '@clerk/nextjs';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';


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
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} {...pageProps}>
          <Component {...pageProps} />
        </ClerkProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}
