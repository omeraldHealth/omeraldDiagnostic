
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

const queryClient = new QueryClient({})

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
