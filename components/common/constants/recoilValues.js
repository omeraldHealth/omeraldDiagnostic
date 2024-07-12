import { useRecoilValue } from "recoil";
import { profileState } from "../recoil/profile";
import { operatorState } from "../recoil/operator";
import { branchState } from "../recoil/branch/branch";
import { dashTabs } from "../recoil/dashboard";
import { booleanState } from "../recoil/booleanAtom";
import { testDetailsState } from "../recoil/testDetails";
import { reportState } from "../recoil/report";
import { logoStateData } from "../recoil/logo" 
import {paramState} from "../recoil/testDetails/param"
import {userState} from "../recoil/user"

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
    '/chooseDc'
];

export const useProfileValue = () => useRecoilValue(profileState);
export const useLogoValue = () => useRecoilValue(logoStateData);
export const useTestDataValue = () => useRecoilValue(testDetailsState);
export const useReportValue = () => useRecoilValue(reportState);
export const useBooleanValue = () => useRecoilValue(booleanState);
export const useManagerValue = () => useRecoilValue(operatorState);
export const useCurrentBranchValue = () => useRecoilValue(branchState);
export const useDashboardTabs = () => useRecoilValue(dashTabs);
export const useParamValue = () => useRecoilValue(paramState);
export const useUserValues = () => useRecoilValue(userState);
