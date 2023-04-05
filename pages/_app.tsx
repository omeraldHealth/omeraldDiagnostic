
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


export default function App({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
		setIsMounted(true)
	}, [])

  return (
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
            <GlobalStyle />
            <ToastContainer autoClose={1000}/>
            <ThemeProvider theme={theme}>{isMounted && <Allowed>
              <ClerkProvider publishableKey='pk_test_ZGFyaW5nLWNyYWItMS5jbGVyay5hY2NvdW50cy5kZXYk' {...pageProps} >
            <Component {...pageProps} />
          </ClerkProvider>
          </Allowed> }</ThemeProvider>
        </AuthContextProvider>
    </QueryClientProvider>
    </Provider>
  )
}
