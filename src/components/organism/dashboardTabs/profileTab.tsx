import { useProfileValue } from "@components/common/constants/recoilValues";
import { ProfileSummaryComponent } from "@components/molecules/profile";
import { Fragment } from "react";

export default function ProfileTab() {
  const profile = useProfileValue();

  return (
    <Fragment>
      <div className="bg-signBanner justify-center">
        <ProfileSummaryComponent
          profile={profile}
          style={"p-8"}
          summary={false}
        />
      </div>
    </Fragment>
  );
}
