import { Fragment} from 'react'
import { Spinner } from '@components/atoms/loader'
import dynamic from 'next/dynamic'

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
