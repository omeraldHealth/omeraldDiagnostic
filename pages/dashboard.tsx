import { Fragment, useEffect, useState} from 'react'
import { Spinner } from '@components/atoms/loader'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useAuthContext } from 'utils/context/auth.context'
import { useUser } from '@clerk/clerk-react'

const Head = dynamic(() => import('@components/atoms/head/head'))
const DashboardTemplate = dynamic(() => import('@components/templates/dashboardTemplate/dashboard'),{loading: () => <Spinner/>})

export default function Dashboard() {


  return (
    <Fragment>
			<Head title={'Omerald Diagnostic | Dashboard'} />
      <DashboardTemplate/>
    </Fragment>
  )
}
