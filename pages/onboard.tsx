import { Fragment } from 'react'
import { Head } from '@components/atoms'
import { OnboardComp } from '@components/organism'

export default function Onboard() {
  return (
    <Fragment>
	    <Head title={'Omerald Diagnostic | Onboard'} />
      <OnboardComp/>
	  </Fragment>
  )
}
