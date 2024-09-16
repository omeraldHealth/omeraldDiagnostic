import { ADMIN_USER_ACTIVITES_COLUMNS } from "@/utils/forms/forms";
import { useCurrentBranch } from "@/utils/recoil/values";
import { CommonSettingTable } from "@/utils/table";
import React from "react";

export const Activity = () => {
  const currentBranch = useCurrentBranch();
  // @ts-ignore
  const activities = currentBranch && currentBranch?.activities;

  const sortedActivities = [...activities].sort(
    // @ts-ignore
    (a, b) => new Date(b.updatedTime) - new Date(a.updatedTime),
  );

  return (
    <div className="sdsa">
      <CommonSettingTable
        data={sortedActivities}
        columns={ADMIN_USER_ACTIVITES_COLUMNS}
      />
    </div>
  );
};