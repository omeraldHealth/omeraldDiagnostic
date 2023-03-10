import { Fragment } from 'react'
import { Spinner } from '@components/atoms/loader'
import dynamic from 'next/dynamic'

const Error = dynamic(() => import('@components/atoms/error'),{loading: () => <Spinner/>})
const Head = dynamic(() => import('@components/atoms/head/head'))

export default function Home() {
  return (
    <Fragment>
			  <Head title={'Omerald Diagnostic | 404'} />
        <Error/>
    </Fragment>
  )
}
