import '../styles/tailwind.css'
import { GlobalStyle, theme } from '@styles/index'
import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import type { AppProps } from 'next/app'
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from 'utils/context/auth.context'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import store from 'utils/store/store'
import Allowed from 'utils/permissions'

const queryClient = new QueryClient({
  defaultOptions: {
    // queries: {
    //   retries: 3, // Set the maximum number of retries to 3 for all queries
    // },
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
            <ThemeProvider theme={theme}>{isMounted && <Allowed><Component {...pageProps} /></Allowed> }</ThemeProvider>
        </AuthContextProvider>
    </QueryClientProvider>
    </Provider>
  )
}
