import { useRecoilValue } from "recoil";
import { profileState } from "../recoil/profile";
import { useUser } from "@clerk/clerk-react";

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