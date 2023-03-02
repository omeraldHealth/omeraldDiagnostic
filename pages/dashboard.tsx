import { Fragment, useEffect } from 'react'
import { Head } from '@components/atoms'
import { DashboardTemplate } from '@components/templates/dashboardTemplate/dashboard'
import { useDispatch } from 'react-redux'
import { useAuthContext } from 'utils/context/auth.context'
import { SET_DIAGNOSTIC_DETAILS } from 'utils/store/types'


export default function Dashboard() {
  
  const auth = useAuthContext()
  const dispatch = useDispatch()
  

  useEffect(()=>{
    dispatch({ type: SET_DIAGNOSTIC_DETAILS,payload:auth?.diagnosticDetails});
  },[])
  
  return (
    <Fragment>
			<Head title={'Omerald Diagnostic | Dashboard'} />
      <DashboardTemplate/>
    </Fragment>
  )
}
