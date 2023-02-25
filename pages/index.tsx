import { Fragment } from 'react'
import { Head } from '@components/atoms'
import { LandingPage } from '@components/organism'

export default function Home() {
  return (
    <Fragment>
			<Head title={'Omerald Diagnostic'} />
      <LandingPage/>
		</Fragment>
  )
}
