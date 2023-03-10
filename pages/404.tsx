import { Fragment } from 'react'
import { Spinner } from '@components/atoms/loader'
import dynamic from 'next/dynamic'


const Head = dynamic(() => import('@components/atoms/head/head'))
const Error = dynamic(() => import('@components/organism/error/index').then(res=>res.Error),{loading: () => <Spinner/>})

export default function Home() {
  return (
    <Fragment>
			<Head title={'Omerald Diagnostic | 404'} />
        <Error/>
    </Fragment>
  )
}
