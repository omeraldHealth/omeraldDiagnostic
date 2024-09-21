//@ts-nocheck
import { usePersistedBranchState, usePersistedDCState } from "@/hooks/localstorage";
import { useDCProfileValue } from "@/utils/recoil/values";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { PageLoader } from "../pageLoader";
import { errorAlert } from "../alerts";
import { useRouter } from "next/router";
import { dashTabs } from "@/utils/recoil";

export function BranchSelection() {
  const [selectedBranch, setSelectedBranch] = usePersistedBranchState();
  const selectedDCId = usePersistedDCState();
  const dcProfile = useDCProfileValue();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const router = useRouter();
  const [tabs, setTabs] = useState(dashTabs);

  // Alert if no valid branch is selected, and update tabs or navigate
  useEffect(() => {
    if (!selectedBranch && (!dcProfile || !dcProfile?.branches?.length)) {
      errorAlert("No valid branch found. Redirecting to settings.");
      setTabs("/settings");
      router.push("/settings");
    }
  }, [selectedBranch, dcProfile, router, setTabs]);

  // Handle branches initialization and selection
  useEffect(() => {
    if (Array.isArray(dcProfile?.branches) && dcProfile.branches.length > 0) {
      // Set the default branch if none is selected
      if (!selectedBranch) {
        setSelectedBranch(dcProfile.branches[0]._id);
      }

      const formattedOptions = dcProfile.branches.map((branch) => ({
        label: branch.branchName || "Branch", // Use branchName or default to "Branch"
        value: branch._id,
      }));
      setOptions(formattedOptions);
    } else {
      setOptions([]);
    }
  }, [dcProfile, selectedBranch]);

  const handleBranchChange = (value) => {
    setLoading(true);
    setSelectedBranch(value);

    // Simulate a loading delay (e.g., network delay)
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  console.log(selectedBranch)

  return (
    <section className="my-2">

      <Select
        placeholder="Select Branch"
        onChange={handleBranchChange}
        options={options}
        {...(selectedBranch ? { value: selectedBranch } : {})}
        style={{ width: "100%" }}
        allowClear
      />
      {loading && <PageLoader />}
    </section>
  );
}
