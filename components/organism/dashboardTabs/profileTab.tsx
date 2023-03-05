import { ProfileSummaryComponent } from '@components/molecules/profile'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function ProfileTab() {
  const diagnosticProfile = useSelector((state:any)=>state.diagnosticReducer)
  const dispatch = useDispatch()
  dispatch({type:"SET_LOADING",payload:false})
  return (
    <Fragment>
        <div className="p-4 sm:p-6 xl:p-8 h-[112vh] sm:h-[92vh] bg-signBanner flex w-100 justify-center">
          <ProfileSummaryComponent style={"p-8"} props={diagnosticProfile} />
        </div>
    </Fragment>   
  )
}
