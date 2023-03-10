import { ProfileSummaryComponent } from '@components/molecules/profile'
import { Fragment } from 'react'

export default function ProfileTab() {

  return (
    <Fragment>
        <div className="p-4 sm:p-6 xl:p-8 h-[112vh] sm:h-[92vh] bg-signBanner flex w-100 justify-center">
          <ProfileSummaryComponent style={"p-8"} />
        </div>
    </Fragment>   
  )
}
