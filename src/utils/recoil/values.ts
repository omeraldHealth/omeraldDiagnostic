import { useRecoilValue } from 'recoil';
import { branchState, dashTabs, profileState, userDataState } from '.';


export const useUserRecoilValue = () => useRecoilValue(userDataState);
export const useDashboardTabs = () => useRecoilValue(dashTabs);
export const useDCProfileValue = () => useRecoilValue(profileState);
export const useCurrentBranch = () => useRecoilValue(branchState);
