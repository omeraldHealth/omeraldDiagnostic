//@ts-nocheck
import { usePersistedBranchState, usePersistedDCState } from "@/hooks/localstorage";
import { useDCProfileValue } from "@/utils/recoil/values";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { PageLoader } from "../pageLoader";

export function BranchSelection() {
  const [selectedBranch, setSelectedBranch] = usePersistedBranchState();
  const selectedDCId = usePersistedDCState();
  const dcProfile = useDCProfileValue();
  const [loading, setLoading] = useState(false)

  // State to hold the branches of the selected diagnostic center
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    if (Array.isArray(dcProfile?.branches)) {
      setBranches(dcProfile.branches);
    } else {
      setBranches([]);
    }
  }, [dcProfile]);

  // Create options for the Select component
  const options = branches.map((branch) => ({
    label: branch.branchName || "Branch",
    value: branch._id,
  }));

  const handleBranchChange = (value) => {
    setLoading(true);
    setSelectedBranch(value);
  
    // Simulate a delay (e.g., 500 milliseconds)
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };
  
  

  return (
    <section className="my-2">
      <Select
        placeholder="Select Branch"
        onChange={handleBranchChange}
        options={options}
        value={selectedBranch}
        style={{ width: "100%" }}
      />
      {loading && <PageLoader />}
    </section>
  );
}
