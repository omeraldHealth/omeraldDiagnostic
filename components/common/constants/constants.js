import { useRecoilValue } from "recoil";
import { profileState } from "../recoil/profile";
import { operatorState } from "../recoil/operator";
import { branchState } from "../recoil/blogs/branch";

export const ROUTES_WITHOUT_SIDEBAR = [
    '/',
    '/404',
    '/contact',
    '/verifyUser',
    '/signIn',
    '/signUp',
    '/onboard'
  ];

export const useProfileValue = () => useRecoilValue(profileState);
export const useManagerValue = () => useRecoilValue(operatorState);
export const useCurrentBranchValue = () => useRecoilValue(branchState);

export const setProfileValue = () => useRecoilState(profileState);
export const setManagerValue = () => useSetRecoilState(operatorState);
export const setCurrentBranchValue = () => useRecoilState(branchState);