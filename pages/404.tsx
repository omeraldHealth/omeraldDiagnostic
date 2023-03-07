import { Fragment } from 'react'
import { Head } from '@components/atoms'
import { Error } from '@components/organism'

export default function Home() {
  return (
    <Fragment>
			<Head title={'Omerald Diagnostic | 404'} />
        <Error/>
    </Fragment>
  )
}
