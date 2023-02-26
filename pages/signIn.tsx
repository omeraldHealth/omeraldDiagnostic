import { Fragment } from 'react'
import { Head } from '@components/atoms'
import { SignIn } from '@components/organism'

export default function Home() {
  return (
    <Fragment>
			<Head title={'Omerald Diagnostic | Sign In'} />
      <SignIn/>
	  </Fragment>
  )
}
