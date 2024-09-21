import { atom } from 'recoil';
import { BranchDetailInterface, ProfileDetailsInterface, UserInfo } from '../interface/getData';

export const profileState = atom<ProfileDetailsInterface>({
  key: 'profileState',
  default: {
    centerName: { type: '' },
    phoneNumber: { type: '' },
    ownerId: { type: '' },
    brandingInfo: { type: {} },
    branches: { type: [{}] },
    email: { type: '' },
    updatedAt: { type: new Date() },
  },
});

export const branchState = atom<BranchDetailInterface[]>({
  key: 'branchState',
  default: [],
});

export const userDataState = atom<UserInfo>({
  key: 'userState',
  default: {
    userName: '', // Optional, so this can be an empty string
    phoneNumber: '', // Initialize as an empty string
    diagnosticCenters: [
      {
        diagnostic: {
          centerName: "",
          _id: ""
        }, // Empty string as a placeholder for the diagnostic center ID
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

export const unSelectedDcState = atom<boolean>({
  key: 'unSelectedDc',
  default : false
})

export const dashTabs = atom<string>({
  key: 'dashboardTab',
  default: 'Dashboard',
});

export const sidebarOpenState = atom<boolean>({
  key: 'sidebarState',
  default: false,
});

export const settingTabState = atom<string>({
  key: 'settingTabState',
  default: "1",
})

export const createDC = atom<boolean>({
  key: 'createDC',
  default: false,
})