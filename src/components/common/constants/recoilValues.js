import { useRecoilValue } from 'recoil';
import { profileState } from '../recoil/profile';
import { operatorState } from '../recoil/operator';
import { branchState } from '../recoil/branch/branch';
import { dashTabs } from '../recoil/dashboard';
import { booleanState } from '../recoil/booleanAtom';
import {
  editTestIdState,
  editTestState,
  testDetailsState,
} from '../recoil/testDetails';
import { reportState } from '../recoil/report';
import { logoStateData } from '../recoil/logo';
import { paramState } from '../recoil/testDetails/param';
import { userState } from '../recoil/user';
import { bioRefState } from '../recoil/testDetails/test';
import { reportDataState } from '../recoil/report/reportData';

export const ROUTES_WITHOUT_SIDEBAR = [
  '/',
  '/404',
  '/contact',
  '/verifyUser',
  '/signIn',
  '/signUp',
  '/onboard',
  '/info/features',
  '/info/knowledge',
  '/info/pricing',
  '/info/blog',
  '/info/about',
  '/info/faq',
  '/info/consent',
  '/info/disclaimer',
  '/info/terms',
  '/info/privacy',
  '/chooseDc',
];

export const useProfileValue = () => useRecoilValue(profileState);
export const useLogoValue = () => useRecoilValue(logoStateData);
export const useTestDetailValue = () => useRecoilValue(testDetailsState);
export const useReportValue = () => useRecoilValue(reportState);
export const useReportDetailsValue = () => useRecoilValue(reportDataState);
export const useBioRefValue = () => useRecoilValue(bioRefState);
export const useBooleanValue = () => useRecoilValue(booleanState);
export const useManagerValue = () => useRecoilValue(operatorState);
export const useCurrentBranchValue = () => useRecoilValue(branchState);
export const useDashboardTabs = () => useRecoilValue(dashTabs);
export const useParamValue = () => useRecoilValue(paramState);
export const useUserValues = () => useRecoilValue(userState);
export const useEditTestValues = () => useRecoilValue(editTestState);
export const useEditTestIdValues = () => useRecoilValue(editTestIdState);
