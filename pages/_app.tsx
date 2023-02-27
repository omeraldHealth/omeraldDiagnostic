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

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
		setIsMounted(true)
	}, [])

  return (
    <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
            <GlobalStyle />
            <ToastContainer/>
            <ThemeProvider theme={theme}>{isMounted && <Provider store={store}><Component {...pageProps} /></Provider> }</ThemeProvider>
        </AuthContextProvider>
    </QueryClientProvider>
  )
}
