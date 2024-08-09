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
    const profileRecoilState = useRecoilValue(profileState)
    const [currentBranch, setCurrentBranch] = useState({});
    const [selectedBranch, setSelectedBranch] = usePersistedBranchState();
  
    const handleBranchChange = (value: any) => {
      setSelectedBranch(value)
    };

    const options = profileRecoilState?.branches?.map((branch: BranchDetailInterface) => {
        return { label: branch?.branchName, value: branch?._id, key: branch?.branchName }
    })

    useEffect(() => {
        let filteredBranch;
      
        if (selectedBranch) {
          filteredBranch = profileRecoilState?.branches?.find(
            (branch: BranchDetailInterface) => branch._id === selectedBranch
          );
        } else {
          filteredBranch = profileRecoilState?.branches?.[0];
        }
      
        setCurrentBranch(filteredBranch || null);
      }, [selectedBranch, profileRecoilState?.branches]);
      

    return (
      <section>
        {profileRecoilState &&
           <Select
             placeholder="Select Branch"
             onChange={handleBranchChange}
             options={options}
             value={{
                label: currentBranch?.branchName,
                key: currentBranch?._id,
                value: currentBranch?._id
            }}
           />
        }
      </section>
    );
}