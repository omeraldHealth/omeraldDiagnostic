import { atom } from 'recoil';

export interface BranchDetailInterface {
  branchName: string;
  branchEmail: string;
  branchAddress: string;
  branchContact: string;
  branchManager: string;
}

export const branchState = atom<BranchDetailInterface[]>({
  key: 'branchState',
  default: [],
});
