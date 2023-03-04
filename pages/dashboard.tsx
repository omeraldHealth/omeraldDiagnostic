import { Fragment, useEffect } from 'react'
import { Head } from '@components/atoms'
import { DashboardTemplate } from '@components/templates/dashboardTemplate/dashboard'


export default function Dashboard() {
  
  return (
    <Fragment>
			<Head title={'Omerald Diagnostic | Dashboard'} />
      <DashboardTemplate/>
    </Fragment>
  )
}
