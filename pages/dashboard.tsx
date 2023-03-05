import { Fragment, useEffect, useState } from 'react'
import { Head } from '@components/atoms'
import { DashboardTemplate } from '@components/templates/dashboardTemplate/dashboard'
import { useSelector } from 'react-redux'
import { Spinner } from '@components/atoms/loader'


export default function Dashboard() {

  return (
    <Fragment>
			<Head title={'Omerald Diagnostic | Dashboard'} />
      <DashboardTemplate/>
    </Fragment>
  )
}
