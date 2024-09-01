import { atom } from 'recoil';
import { UserInfo } from '../interface/getData';

export const userDataState = atom<UserInfo>({
  key: 'userState',
  default: {
    userName: '', // Optional, so this can be an empty string
    phoneNumber: '', // Initialize as an empty string
    diagnosticCenters: [
      {
        diagnostic: '', // Empty string as a placeholder for the diagnostic center ID
        branches: [
          {
            branchId: '', // Empty string as a placeholder for the branch ID
            roleName: 'operator', // Default role, this can be adjusted as needed
          },
        ],
      },
    ],
  },
});

export const selectedDcState = atom<string>({
  key: 'selectedDcId',
  default : ''
})

export const selectedBranchState = atom<string>({
  key: 'selectedBranchId',
  default : ''
})

