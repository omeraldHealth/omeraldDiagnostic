import { useProfileValue } from '@components/common/constants/constants'
import { ProfileSummaryComponent } from '@components/molecules/profile'
import { Fragment } from 'react'

export default function ProfileTab() {

  const profile = useProfileValue()

  return (
    <Fragment>
        <div className="p-4 sm:p-6 xl:p-8 h-[112vh] sm:h-[92vh] bg-signBanner flex w-100 justify-center">
          <ProfileSummaryComponent profile={profile} style={"p-8"} summary={false} />
        </div>
    </Fragment>   
  )
}
