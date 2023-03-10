import { Fragment } from 'react'
import { Spinner } from '@components/atoms/loader'
import { PageTemplate } from '@components/templates/pageTemplate'
import dynamic from 'next/dynamic'

const OnboardComponents = dynamic(() => import('@components/molecules/onboard'),{loading: () => <Spinner/>})
const Head = dynamic(() => import('@components/atoms/head/head'))
const Navbar = dynamic(() => import('@components/molecules/navbar').then(res=>res.Navbar),{loading:()=><Spinner/>})
const Footer = dynamic(() => import('@components/molecules/footer').then(res=>res.Footer))

function Onboard() {
  return (
    <Fragment>
	    <Head title={'Omerald Diagnostic | Onboard'} />
      <PageTemplate>
            <div>
                <Navbar/>
                    <section className='min-h-[80vh]'>
                      <OnboardComponents/>
                    </section>
                <Footer />
            </div>
        </PageTemplate>
	  </Fragment>
  )
}

export default Onboard;