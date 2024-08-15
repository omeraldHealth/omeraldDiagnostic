import { usePersistedBranchState } from "@components/common/recoil/hooks/usePersistedState";
import { profileState } from "@components/common/recoil/profile";
import { BranchDetailInterface } from "@utils/types";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

interface Branch {
  branchName: string;
  _id: string;
}

export function BranchSelection() {
  const profileRecoilState = useRecoilValue(profileState);
  const [selectedBranch, setSelectedBranch] = usePersistedBranchState();
  const [defaultBranch, setDefaultBranch] = useState<string | undefined>(
    undefined,
  );

  // @ts-ignore
  const options =
    profileRecoilState?.branches?.map((branch: BranchDetailInterface) => {
      return { label: branch.branchName, value: branch._id, key: branch._id };
    }) || [];

  const handleDefaultBranch = () => {
    //@ts-ignore
    const branchExistsInProfile = profileRecoilState?.branches?.some(
      (branch: Branch) => branch._id === selectedBranch,
    );

    if (branchExistsInProfile) {
      setDefaultBranch(selectedBranch);
    } else {
      const firstBranch = profileRecoilState?.branches?.[0]?._id;
      if (firstBranch) {
        setDefaultBranch(firstBranch);
        setSelectedBranch(firstBranch);
      }
    }
  };

  const handleBranchChange = (value: string) => {
    setDefaultBranch(value);
    setSelectedBranch(value);
  };

  useEffect(() => {
    handleDefaultBranch();
  }, [profileRecoilState]);

  return (
    <section>
      {profileRecoilState && (
        <Select
          placeholder="Select Branch"
          onChange={handleBranchChange}
          options={options}
          value={defaultBranch}
        />
      )}
    </section>
  );
}
