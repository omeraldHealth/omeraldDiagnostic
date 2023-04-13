import { Fragment } from 'react'
import { PageTemplate } from '@components/templates/pageTemplate'
import dynamic from 'next/dynamic'
import styles from "styles/signIn.module.css"
import { Spinner } from '@components/atoms/loader'

const Head = dynamic(() => import('@components/atoms/head/head'),{loading: () => <Spinner/>})
const Navbar = dynamic(() => import('@components/molecules/navbar').then(res=>res.Navbar),{loading:()=><Spinner/>})
const SignUpComponent = dynamic(() => import('@components/molecules/signIn/signUp'),{loading: () => <Spinner/>})

export default function Home() {
  return (
    <Fragment>
			<Head title={'Omerald Diagnostic | Sign Up'} />
      <PageTemplate>
            <div className={`max-h-[100vh] ${styles["signInContainer"]}`}>
                <Navbar/>
                  <section>
                    <SignUpComponent/>
                  </section>
            </div>
        </PageTemplate>
	  </Fragment>
  )
}
