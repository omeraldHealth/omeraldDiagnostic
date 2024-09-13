import { useRecoilValue } from 'recoil';
import { dashTabs, profileState, userDataState } from '.';


export const useUserRecoilValue = () => useRecoilValue(userDataState);
export const useDashboardTabs = () => useRecoilValue(dashTabs);
export const useDCProfileValue = () => useRecoilValue(profileState);
