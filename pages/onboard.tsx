import { Fragment } from 'react'
import { Spinner } from '@components/atoms/loader'
import dynamic from 'next/dynamic'

const OnboardTemplate = dynamic(() => import('@components/organism/onboard/index'),{loading: () => <Spinner/>})
const Head = dynamic(() => import('@components/atoms/head/head'))

function Onboard() {
  return (
    <Fragment>
	    <Head title={'Omerald Diagnostic | Onboard'} />
      <OnboardTemplate/>
	  </Fragment>
  )
}

export default Onboard;