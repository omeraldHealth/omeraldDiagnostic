import { Inter } from 'next/font/google'
import { Fragment } from 'react'
import { Head } from '@components/atoms'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Fragment>
			<Head title={'Omerald Diagnostic'} />
			{/* <PageTemplate navigation={<NavigationBar />} footer={<Footer />}></PageTemplate> */}
		</Fragment>
  )
}
