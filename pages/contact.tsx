import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { ContactPage } from '@components/organism/contact'

const Head = dynamic(() => import('@components/atoms/head/head'))

export default function Contact() {

  return (
    <Fragment>
	  <Head title={'Omerald Diagnostic | Contact'} />
      <ContactPage/>
    </Fragment>
  )
}
