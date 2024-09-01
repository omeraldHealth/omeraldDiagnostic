import { useRecoilValue } from 'recoil';
import { userDataState } from '.';


export const useUserRecoilValue = () => useRecoilValue(userDataState);
