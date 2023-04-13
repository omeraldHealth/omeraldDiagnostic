import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { InfoPage } from '@components/organism/info'
import { useRouter } from 'next/router';

const Head = dynamic(() => import('@components/atoms/head/head'))

export default function Info() {
  const router = useRouter();
  const { detail } = router.query;
  return (
    <Fragment>
	  <Head title={'Omerald Diagnostic | '+detail} />
      <InfoPage detail={detail}/>
    </Fragment>
  )
}
