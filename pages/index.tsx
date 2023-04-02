import { Fragment } from 'react'
import { Spinner } from '@components/atoms/loader'
import dynamic from 'next/dynamic'

const Head = dynamic(() => import('@components/atoms/head/head'))
const LandingPage = dynamic(() => import('@components/organism/landing/landingPage'),{loading: () => <Spinner/>})

export default function Home() {

  return (
    <Fragment>
			<Head title={'Omerald Diagnostic'} />
      <LandingPage/>
		</Fragment>
  )
}
