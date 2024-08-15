import { branchState } from "@components/common/recoil/branch/branch";
import {
  usePersistedBranchState,
  usePersistedDCState,
} from "@components/common/recoil/hooks/usePersistedState";
import { useGetDcProfile } from "@utils/reactQuery";
import { useSetRecoilState } from "recoil";

// export function useUpdatedBranch() {
//   const setCurrentBranch = useSetRecoilState(branchState);
//   const [selectedBranch] = usePersistedBranchState();
//   const [selectedDc] = usePersistedDCState();

//   const updateCurrentBranch = () => {
//     const { data: profileData, isLoading } = useGetDcProfile({
//       selectedCenterId: selectedDc,
//     });

//     if (!isLoading) {
//       // @ts-ignore
//       const branch = profileData?.branches.find(
//         (branch: any) => branch._id === selectedBranch,
//       );
//       if (branch) {
//         setCurrentBranch(branch);
//       }
//     }
//   };

//   return updateCurrentBranch;
// }
